<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { currentModal, loading } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import { invalidate, goto } from '$app/navigation';
	import Container from '$lib/Container.svelte';

	const handleSubmit: SubmitFunction = () => {
		$loading = true;
		return async ({ result }) => {
			$loading = false;
			if (result.type === 'success') {
				await invalidate('supabase:auth');
				$currentModal = null;
				goto('/dash')
			}
			await applyAction(result);
		};
	};
</script>

<svelte:head>
	<title>Set Your Password | BCRV</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
	<Container>
		<div slot="title" class="flex justify-center items-center">
			<div class="text-xl font-medium text-gray-900">
				Set a password for future logins
			</div>
		</div> 
		<form method="POST" use:enhance={handleSubmit} slot="content" class="px-4 py-6 flex flex-col items-center justify-center space-y-4">
			{#if $page.form?.error}
				<dl class="w-full max-w-lg">
					<div class="grid sm:px-6">
						<div class="p-3 rounded-sm border bg-red-50 border-red-500/50 text-red-700 text-sm font-medium">
							{$page.form.error}
						</div>
					</div>
				</dl>
			{/if}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<dt class="text-sm font-normal text-gray-500 sm:self-center">
						<label for="password">Password</label>
					</dt>
					<dd class="mt-1 text-gray-900">
						<input id="password" name="password" type="password" required class="standard-form font-bold text-lg" />
					</dd>
				</div>
			</dl>
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<dt class="text-sm font-normal text-gray-500 sm:self-center">
						<label for="confirm">Confirm Password</label>
					</dt>
					<dd class="mt-1 text-gray-900">
						<input id="confirm" name="confirm" type="password" required class="standard-form" />
					</dd>
				</div>
			</dl>
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6 mt-2">
					<button disabled={$loading} type="submit" class="full-width-button"> Save Password </button>
				</div>
			</dl>
		</form>
	</Container>
</div>
