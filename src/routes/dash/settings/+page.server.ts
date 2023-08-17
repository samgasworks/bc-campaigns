import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	newSource: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const { request } = event;
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const cleanedName = name.trim().toLowerCase();

		if (cleanedName.length < 3) {
			return fail(400, {
				error: 'Name too short',
				values: {
					name: cleanedName
				}
			});
		}

		const { error } = await supabaseClient
			.from('sources')
			.select('*')
			.eq('name', cleanedName)
			.single();

		if (error) {
			return fail(400, {
				error: 'Name already exists',
				values: {
					name: cleanedName
				}
			});
		}

		const { error: insertError } = await supabaseClient
			.from('sources')
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
	newMedium: async (event) => {
		const { supabaseClient } = await getSupabase(event);

		const { request } = event;
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const cleanedName = name.trim().toLowerCase();

		if (cleanedName.length < 3) {
			return fail(400, {
				error: 'Name too short',
				values: {
					name: cleanedName
				}
			});
		}

		const { error } = await supabaseClient
			.from('mediums')
			.select('*')
			.eq('name', cleanedName)
			.single();

		if (error) {
			return fail(400, {
				error: 'Name already exists',
				values: {
					name: cleanedName
				}
			});
		}

		const { error: insertError } = await supabaseClient
			.from('mediums')
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