import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	const { session } = await getSupabase(event);
	if (!session) {
		throw redirect(307, '/login');
	}
}