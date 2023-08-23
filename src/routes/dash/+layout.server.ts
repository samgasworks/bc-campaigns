import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	const { url } = event;
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(307, '/login');
	}

	if (session?.user?.user_metadata?.pw_set !== true && url.pathname !== '/dash/set-password') {
	 	throw redirect(307, '/dash/set-password');
	}

	const { data: account } = await supabaseClient
		.from('accounts')
		.select('*')
		.eq('id', session.user.id)
		.single();

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
		account: account
	}

}