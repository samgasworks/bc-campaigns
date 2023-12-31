import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { EmailInvite } from '$lib/types';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';
import { createClient as createService } from '@supabase/supabase-js';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

const supabaseService = createService(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
	global: {
		fetch: fetch.bind(globalThis)
	}
});

export const POST: RequestHandler = async (event) => {
	const { url } = event;
	const { session } = await getSupabase(event);
	if (!session) {
		throw error(400, 'Not authorized');
	}

	const { email } = await event.request.json() as EmailInvite;
	const { data, error: inviteError } = await supabaseService.auth.admin.inviteUserByEmail(email, {
		redirectTo: `${url.origin}/login/redirect`,
	});

	if (inviteError) {
		throw error(500, inviteError.message);
	}

	return json(data);
};
