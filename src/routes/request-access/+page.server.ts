import type { Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	default: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const { request } = event;
		const formData = await request.formData();

		const first_name = formData.get('first_name') as string;
		const last_name = formData.get('last_name') as string;
		const email = formData.get('email') as string | undefined;

		// check and sanitize inputs
		const cleanedFirst = first_name.replace(/[^\w\s]/gi, '');
		const cleanedLast = last_name.replace(/[^\w\s]/gi, '');


		if (!first_name) {
			return fail(400, {
				error: 'Please enter your first name',
				values: {
					last_name,
					email
				}
			});
		}

		if (!last_name) {
			return fail(400, {
				error: 'Please enter your last name',
				values: {
					first_name,
					email
				}
			});
		}

		if (!email) {
			return fail(400, {
				error: 'Please enter your email',
				values: {
					first_name,
					last_name
				}
			});
		}

		const { error: supabaseError } = await supabaseClient
			.from('requests')
			.insert({
				first_name: cleanedFirst,
				last_name: cleanedLast,
				email: email
			});
		
		if (supabaseError) {
			return fail(500, {
				error: 'Error submitting request'
			});
		}

		return { success: true };
	}
};

