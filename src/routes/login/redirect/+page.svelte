<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	onMount(async () => {
		invalidate('supabase:auth');
	});


	function redirectOnError() {
		if (browser && $page.url) {
			if ($page.url.hash) {
				const errorHash = $page.url.hash.split('&');
				let authError: string | null = null;
				errorHash.forEach((hash) => {
					if (hash.includes('error_description')) {
						authError = hash.split('=')[1];
					}
				});
				if (authError) {
					goto('/login?authError=' + authError);
				}
			}
		}
	}

	$: $page.url, redirectOnError();

</script>

<svelte:head>
	<title>Logging In | BCRV</title>
</svelte:head>


<div class="min-h-full flex items-center justify-center bg-blue-400">
	<div class="py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
		<div class="mx-auto w-full max-w-3xl">
			<div class="flex flex-col items-center justify-center">
				<img class="h-48 w-auto drop-shadow-xl animate-pulse" src="/bc-logo.png" alt="DispoGO" />
			</div>

			<p class="mt-12 text-center text-gray-900 p-8 bg-white rounded-sm shadow-xl">
				Hold tight, we are now logging you in...
			</p>
		</div>
	</div>
</div>
