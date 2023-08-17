<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { loading } from '$lib/utils';

	const handleSubmit: SubmitFunction = () => {
		$loading = true;
		return async ({ result }) => {
			$loading = false;
			await applyAction(result);
		};
	};
</script>

<svelte:head>
	<title>Log In | BCRV</title>
</svelte:head>

<div class="relative flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="-z-10 absolute inset-0 contrast-50 brightness-125">
		<img src="/login.jpg" alt="" class="w-full h-full object-cover" />
	</div>
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img class="mx-auto h-20 w-auto" src="/bc-logo.png" alt="BCRV">
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			BCRV Campaign Manager
		</h2>
	</div>
  
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-sm sm:px-12">
			<form method="POST" use:enhance={handleSubmit} class="space-y-6">
				{#if $page.form?.error}
					<div class="mb-4 p-3 rounded-sm border bg-red-100 border-red-700/50 text-red-700 text-sm">
						{$page.form.error}
					</div>
				{/if}
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
						<div class="mt-2">
						<input id="email" name="email" type="email" autocomplete="email" required class="standard-form">
					</div>
				</div>
		
				<div>
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
						<div class="mt-2">
						<input id="password" name="password" type="password" autocomplete="current-password" required class="standard-form">
					</div>
				</div>
		
				<div>
					<button type="submit" class="full-width-button">
						Sign in
					</button>
				</div>
			</form>
		</div>
  
		<p class="mt-10 p-4 bg-white/25 shadow text-center text-sm text-gray-400/75 rounded-sm">
			<a href="/" class="leading-6 text-blue-500 hover:text-blue-400">Request Access</a>
			<span class="mx-4">|</span>
			<a href="/" class="leading-6 text-blue-500 hover:text-blue-400">Reset Password?</a>
		</p>
	</div>
</div>