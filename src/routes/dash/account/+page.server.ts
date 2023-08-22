import { redirect, error, fail } from "@sveltejs/kit";
import { AuthApiError } from '@supabase/supabase-js';
import type { PageServerLoad } from "./$types";
import type { Actions } from './$types';
import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export const load: PageServerLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect (307, '/login');
	}

	const { url } = event;
	const reset_password = url.searchParams.get('reset') === 'password' ? true : false;

	const { data: account } = await supabaseClient
		.from('accounts')
		.select('*')
		.eq('id', session.user.id)
		.single();

	return {
		account: account,
		reset_password: reset_password,
	}
}

export const actions: Actions = {
	password: async (event) => {
		const { url } = event;
		const { session, supabaseClient } = await getSupabase(event);

		if (session && session.user && session.user.email) {
			supabaseClient.auth.resetPasswordForEmail(session.user.email, {
				redirectTo: `${url.origin}/dash?reset=password`
			});

			return { success: true };
		} else {
			throw error(403, { message: 'Unauthorized' });
		}
	},
	resetPassword: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm') as string;

		// check and sanitize inputs
		if (!password) {
			return fail(400, {
				error: 'Please enter your password'
			});
		}
		if (password.length < 6) {
			return fail(400, {
				error: 'Password must be at least 6 characters and contain at least 1 letter, 1 number, and 1 special character'
			});
		}
		if (!confirmPassword) {
			return fail(400, {
				error: 'Please confirm your password'
			});
		}
		if (password !== confirmPassword) {
			return fail(400, {
				error: 'Passwords do not match'
			});
		}

		// update the user's password
		const { error } = await supabaseClient.auth.updateUser({
			password: password,
			data: {
				pw_set: true
			}
		});

		if (error) {
			console.log(error)
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.'
				});
			}
			return fail(500, {
				error: 'Server error. Try again in a few minutes.'
			});
		}

		return { success: true };
	}
};
