import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

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
	}
};