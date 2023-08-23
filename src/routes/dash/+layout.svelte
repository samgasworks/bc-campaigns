<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { currentDropDown, currentModal, loading } from '$lib/utils';

	const handleSubmit: SubmitFunction = () => {
		$currentDropDown = null;
		$loading = true;
		return async ({ action, result }) => {
			await applyAction(result);
			$loading = false;
		};
	};

	beforeNavigate(async () => {
		$currentDropDown = null;
		$currentModal = null;
		$loading = true;
	});

	afterNavigate(async ({ from, to }) => {
		$loading = false;
	});
</script>

<div class="flex h-full flex-col">
	<nav class="relative z-20 flex-shrink-0 shadow-sm border-b border-gray-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-20 justify-between">
				<div class="flex w-full justify-between">
					<div class="flex flex-shrink-0 items-center">
						<img class="h-16 w-auto" src="/bc-logo.png" alt="Your Company">
					</div>
					<div class="-my-px ml-6 flex space-x-8">
						{#if $page.url.pathname !== 'dash/set-password'}
						<a href="/dash" class="{$page.url.pathname === '/dash' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1">
							Campaigns
						</a>
						{#if $page.data.account?.role > 5}
						<a href="/dash/settings" class="{$page.url.pathname === '/dash/settings' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1">
							Settings
						</a>
						{/if}
						{/if}
					</div>
					<div></div>
				</div>
				<div class="ml-6 flex items-center">
					<!-- Profile dropdown -->
					<div class="relative ml-3">
						<div>
							<button on:click={() => ($currentDropDown ? ($currentDropDown = null) : ($currentDropDown = 'profile'))} type="button" class="relative flex max-w-xs items-center rounded-sm p-1.5 bg-white text-sm text-gray-500 hover:bg-blue-100 focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
								<span class="absolute -inset-1.5"></span>
								<span class="sr-only">Open user menu</span>
								{$page.data.session?.user.email}							  
							</button>
						</div>
			
						{#if $currentDropDown === 'profile'}
						<div transition:fly|local={{ delay: 50, duration: 200, y: -10, easing: cubicInOut }} on:mouseleave={() => ($currentDropDown = null)} class="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
							<!-- Active: "bg-gray-100", Not Active: "" -->
							<a href="/dash/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100" role="menuitem" tabindex="-1" id="user-menu-item-1">
								Account
							</a>
							<form method="POST" action="/logout" use:enhance={handleSubmit} >
								<button class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 w-full text-left" role="menuitem" tabindex="-1" id="user-menu-item-2">
									Sign out
								</button>
							</form>
						</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</nav>
  
	{#if $currentDropDown}
		<div
			transition:fade|local={{ delay: 0, duration: 200, easing: cubicInOut }}
			on:click={() => ($currentDropDown = null)}
			class="fixed z-10 inset-0 bg-black bg-opacity-20 transition-opacity"
			aria-hidden="true"
		/>
	{/if}
	<div class="py-10 flex-1 bg-sky-50/50">
		<main>
			<div class="flex flex-col space-y-8 mb-16 mx-auto">
				<slot />
			</div>
		</main>
	</div>
</div>
