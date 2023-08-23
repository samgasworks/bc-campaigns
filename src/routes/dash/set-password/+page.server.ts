import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { AuthApiError } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';


export const load: PageServerLoad = async (event) => {
	const { session } = await getSupabase(event);
	if (!session) {
		throw redirect (307, '/login');
	}

	if (session?.user?.user_metadata?.pw_set === true) {
		throw redirect(307, '/dash');
   }

}

export const actions: Actions = {

	default: async (event) => {
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
		const { error: authError } = await supabaseClient.auth.updateUser({
			password: password,
			data: {
				pw_set: true
			}
		});

		const { error: accountUpdateError } = await supabaseClient
			.from('accounts')
			.update({
				accepted_invite: true
			})
			.eq('id', session?.user.id);
		

		if (authError || accountUpdateError) {
			if (authError instanceof AuthApiError && authError.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.'
				});
			}
			return fail(500, {
				error: 'Server error. Try again in a few minutes.'
			});
		}

		const { error: refreshError } = await supabaseClient.auth.refreshSession();

		if (refreshError) {
			return fail(500, {
				error: 'Server error. Try again in a few minutes.'
			});
		}

		return { success: true };
	}
};