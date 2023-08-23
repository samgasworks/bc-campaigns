import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import type { AuthUserResponse } from '$lib/types';
import { error, fail, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageServerLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect (307, '/login');
	}

	const { parent } = event;

	const { account } = await parent();

	if (account && account.role < 5) {
		throw redirect(307, '/dash');
	}

	const { data: users } = await supabaseClient
		.from('accounts')
		.select('*');

	const { data: requests } = await supabaseClient
		.from('requests')
		.select('*');

	return {
		users: users,
		requests: requests,
	}
}

export const actions: Actions = {
	new: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const { request } = event;
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const table = formData.get('table') as string;
		const cleanedName = name.trim().toLowerCase();

		if (cleanedName.length < 3) {
			return fail(400, {
				error: 'Name too short',
				values: {
					name: cleanedName
				}
			});
		}

		const { data: existData, error: existsError } = await supabaseClient
			.from(table)
			.select('*')
			.eq('name', cleanedName);

		if (existsError) {
			return fail(500, {
				error: 'Server error',
				values: {
					name: cleanedName
				}
			});
		}

		if (existData && existData.length > 0) {
			return fail(400, {
				error: 'Name already exists',
				values: {
					name: cleanedName
				}
			});
		}

		const { error: insertError } = await supabaseClient
			.from(table)
			.insert({
				name: cleanedName,
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
	sendInvite: async (event) => {
		const { request, fetch } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(307, '/login');
		}

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const first_name = formData.get('first_name') as string;
		const last_name = formData.get('last_name') as string;
		const role = formData.get('role') as string;

		// check if email is valid
		if (!email) {
			return fail(400, {
				error: 'Please enter your email',
				values: { 
					first_name: first_name,
					last_name: last_name,
					role: role
				}
			});
		}

		if (email === session?.user.email) {
			return fail(400, {
				error: 'Why are you trying to invite yourself bruv',
				values: { 
					email: email,
					first_name: first_name,
					last_name: last_name,
					role: role
				}
			});
		}

		// check if email is already in use
		const { data: existingAccount, error: teamError } = await supabaseClient
			.from('accounts')
			.select(`*`)
			.eq('email', email);

		if (teamError) {
			return fail(400, {
				error: 'There was a server error, please try again',
				values: { email: email }
			});
		}

		if (existingAccount && existingAccount.length === 1) {
			
			if (existingAccount[0].accepted_invite) {
				return fail(400, {
					error: 'This person is already a member of your team',
					values: { email: email }
				});
			} else {
				return fail(400, {
					error: 'This person has already been invited',
					values: { email: email }
				});
			}

		}

		try {
			const inviteResp = await fetch('/invite', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					email: email
				})
			});

			const invitedUser: AuthUserResponse = await inviteResp.json();
			if (invitedUser.user && invitedUser.user.id && invitedUser.user.email) {

				const { error: accountError } = await supabaseClient
					.from('accounts')
					.insert({
						id: invitedUser.user.id,
						first_name: first_name,
						last_name: last_name,
						email: invitedUser.user.email,
						role: Number(role),
						accepted_invite: false
					});

				if (accountError) {
					throw error(500, accountError.message);
				}

				return { success: true };
			}
		} catch (err) {
			throw error(500, 'Server invite error');
		}
	},
	resendInvite: async (event) => {
		const { request, fetch } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(307, '/login');
		}

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const user_id = formData.get('user_id') as string;

		// check if email is already in use
		const { data: updateAccount, error: teamError } = await supabaseClient
			.from('accounts')
			.update({
				created_at: new Date().toISOString(),
			})
			.eq('id', user_id);

		try {
			const inviteResp = await fetch('/invite', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					email: email
				})
			});

			if (inviteResp.ok) {
				return { success: true };
			}
		} catch (err) {
			throw error(500, 'Server invite error');
		}
		
	},
	updateUser: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(307, '/login');
		}

		const formData = await request.formData();
		const user_id = formData.get('user_id') as string;
		const first_name = formData.get('first_name') as string;
		const last_name = formData.get('last_name') as string;
		const role = formData.get('role') as string;

		const { error: updateError } = await supabaseClient
			.from('accounts')
			.update({
				first_name: first_name,
				last_name: last_name,
				role: Number(role)
			})
			.eq('id', user_id);

		if (updateError) {
			throw error(500, updateError.message);
		}

		return { success: true };
	},
	removeUser: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const user_id = formData.get('user_id') as string;
		const confirm = formData.get('confirm') as string;

		if (confirm.toLowerCase() !== 'delete') {
			return fail(400, {
				error: 'You did not type delete',
				values: {
					confirm: confirm
				}
			});
		}

		const { error: u_error } = await supabaseClient
			.from('accounts')
			.delete()
			.eq('id', user_id);

		return { success: true };
	}
};