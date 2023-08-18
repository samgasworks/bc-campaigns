import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(307, '/login');
	}

	const { data: sources } = await supabaseClient
		.from('sources')
		.select('*')
		.order('created_at', { ascending: false });
	
	const { data: mediums } = await supabaseClient
		.from('mediums')
		.select('*')
		.order('created_at', { ascending: false });

	return {
		sources: sources,
		mediums: mediums,
	}

}