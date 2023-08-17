import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			return fail(400, {
				error: 'Please enter your email'
			});
		}
		if (!password) {
			return fail(400, {
				error: 'Please enter your password',
				values: {
					email
				}
			});
		}

		const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Wrong email and/or password',
					values: {
						email
					}
				});
			}
			return fail(500, {
				error: 'Server error. Try again in a few minutes.',
				values: {
					email
				}
			});
		}

		throw redirect(303, '/dash');
	}
};
