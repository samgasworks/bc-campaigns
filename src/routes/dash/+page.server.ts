import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { AuthApiError } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';


export const load: PageServerLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect (307, '/login');
	}

	const { data: campaigns } = await supabaseClient
		.from('campaigns')
		.select('*')
		.order('created_at', { ascending: false });

	return {
		campaigns: campaigns
	}
}

export const actions: Actions = {

	new: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const { request } = event;
		const formData = await request.formData();
		const destination_url = formData.get('destination_url') as string;
		const campaign_name = formData.get('campaign_name') as string;
		const source = formData.get('source') as string;
		const medium = formData.get('medium') as string;
		const cleanedName = campaign_name.trim().replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

		if (cleanedName.length < 3) {
			return fail(400, {
				error: 'Name too short',
				values: {
					name: cleanedName
				}
			});
		}

		const { error: insertError } = await supabaseClient
			.from('campaigns')
			.insert({
				url: destination_url,
				name: cleanedName,
				source: Number(source),
				medium: Number(medium)
			});

		if (insertError) {
			return fail(500, {
				error: 'Server error',
				values: {
					name: cleanedName
				}
			});
		}

		return { success: true };
	},
	edit: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const { request } = event;
		const formData = await request.formData();
		const campaign_id = formData.get('campaign_id') as string;
		const destination_url = formData.get('destination_url') as string;
		const campaign_name = formData.get('campaign_name') as string;
		const source = formData.get('source') as string;
		const medium = formData.get('medium') as string;
		const cleanedName = campaign_name.trim().replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

		if (cleanedName.length < 3) {
			return fail(400, {
				error: 'Name too short',
				values: {
					name: cleanedName
				}
			});
		}

		const { error: insertError } = await supabaseClient
			.from('campaigns')
			.update({
				url: destination_url,
				name: cleanedName,
				source: Number(source),
				medium: Number(medium)
			})
			.eq('id', Number(campaign_id));

		if (insertError) {
			return fail(500, {
				error: 'Server error',
				values: {
					name: cleanedName
				}
			});
		}

		return { success: true };
	},
	delete: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const { request } = event;
		const formData = await request.formData();
		const campaign_id = formData.get('campaign_id') as string;
		const confirm = formData.get('confirm') as string;

		if (confirm.toLowerCase() !== 'delete') {
			return fail(400, {
				error: 'You did not type delete',
				values: {
					confirm: confirm
				}
			});
		}

		const { error: insertError } = await supabaseClient
			.from('campaigns')
			.delete()
			.eq('id', Number(campaign_id));

		if (insertError) {
			return fail(500, {
				error: 'Server error',
				values: {
					confirm: confirm
				}
			});
		}

		return { success: true };
	},
	setPassword: async (event) => {
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