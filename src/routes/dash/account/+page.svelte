<script lang="ts">
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Container from '$lib/Container.svelte';
	import Modal from '$lib/Modal.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { currentModal, loading } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import { invalidate, goto } from '$app/navigation';

	export let data: PageData

	let passwordConfirmationSent = false;

	const handleSubmit: SubmitFunction = ({ action }) => {
		$loading = true;
		return async ({ result }) => {
			$loading = false;
			if (result.type === 'success') {
				if (action.search.indexOf('password') > 0) {
					passwordConfirmationSent = true;
				}
				await invalidate('supabase:auth');
				$currentModal = null;
				if (action.search.indexOf('resetPassword') > 0) {
					goto('/dash/account');
				}
			}
			await applyAction(result);
		};
	};

	function resetPassword() {
		if (data.reset_password || $page.url.searchParams.get('reset') === 'password') {
			$currentModal = 'reset_password';
		}
	}

	onMount(async () => {
		if (data.reset_password || $page.url.searchParams.get('reset') === 'password') {
			$currentModal = 'reset_password';
		}
	});

	$: $page.url, resetPassword();
</script>

<svelte:head>
	<title>Account | BCRV</title>
</svelte:head>

<Container>
	<div slot="title" class="flex justify-between items-center">
		<div class="text-xl font-semibold text-gray-900">
			Account
		</div>
	</div> 
	<div slot="content" class="divide-y divide-gray-200 text-sm">
		<div class="px-6 py-4 flex items-center justify-between">
			<span class="font-light">Email</span>
			<span>{data.session?.user.email}</span>
		</div>
		<div class="px-6 py-4 flex items-center justify-between">
			<span class="font-light">First Name</span>
			<span>{data.account?.first_name}</span>
		</div>
		<div class="px-6 py-4 flex items-center justify-between">
			<span class="font-light">Last Name</span>
			<span>{data.account?.last_name}</span>
		</div>
		<div class="px-6 py-4 flex items-center justify-between">
			<span class="font-light">Password</span>
			{#if passwordConfirmationSent}
			<span class="py-1.5">Email confirmation sent</span>
			{:else}
			<button class="secondary-button" on:click={() => $currentModal = 'password'}>
				Change Password
			</button>
			{/if}
		</div>
	</div>
</Container>

<Modal trigger="password">
	<span slot="title"> Confirm Email to Reset Password </span>
	<form method="POST" action="?/password" use:enhance={handleSubmit} slot="form" class="w-full grid mx-auto space-y-6 max-w-lg p-4 sm:p-6">
		<p class="font-normal text-gray-700 text-center">To reset your password, you first need to click a confirmation link sent to your current email.</p>
		<button disabled={$loading} type="submit" class="full-width-button"> Reset Password </button>
	</form>
</Modal>

<Modal trigger="reset_password">
	<span slot="title"> Enter a New Password </span>
	<form method="POST" action="?/resetPassword" use:enhance={handleSubmit} slot="form" class="px-4 py-6 flex flex-col items-center justify-center space-y-4">
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
</Modal>

<Modal trigger="reset_password">
	<span slot="title"> Enter a New Password </span>
	<form method="POST" action="?/resetPassword" use:enhance={handleSubmit} slot="form" class="px-4 py-6 flex flex-col items-center justify-center space-y-4">
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
</Modal>