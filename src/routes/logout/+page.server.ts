import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	default: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		if (session) {
			await supabaseClient.auth.signOut();
		}

		throw redirect(303, '/login');
	}
};
