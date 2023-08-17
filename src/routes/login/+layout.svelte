<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: {
		// check if user has been set in session store then redirect
		if (browser && $page.data?.session) {
			setTimeout(() => {
				goto('/dash');
			}, 2000);
		}
	}
</script>

<slot />