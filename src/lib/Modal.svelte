<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { currentModal } from './utils';

	export let trigger = '';
	export let closeable = true;
</script>

{#if $currentModal === trigger}
	<div transition:fade|local={{ delay: 0, duration: 200, easing: cubicInOut }} class="fixed z-30 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex items-center sm:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div
				transition:fade|local={{ delay: 0, duration: 200, easing: cubicInOut }}
				on:click={() => (closeable ? $currentModal = null : null)}
				class="{closeable ? 'cursor-pointer' : ''}fixed inset-0 bg-black bg-opacity-40 transition-opacity"
				aria-hidden="true"
			/>

			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

			<div
				transition:scale|local={{ duration: 200, delay: 50, opacity: 0, start: 0.8, easing: cubicInOut }}
				class="inline-block align-bottom border border-gray-300 bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full"
			>
				<div class="block absolute top-0 right-0 pt-3.5 pr-4">
					{#if closeable}
					<button on:click={() => ($currentModal = null)} type="button" class="bg-white text-gray-400 hover:text-black hover:bg-blue-100 hover:shadow rounded-sm p-1 focus:outline-none">
						<span class="sr-only">Close</span>
						<!-- Heroicon name: outline/x -->
						<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					{/if}
				</div>
				<div class="flex items-center justify-center p-4 sm:px-6">
					<h3 class="text-lg leading-6 font-medium text-black" id="modal-title">
						<slot name="title" />
					</h3>
				</div>
				<div class="border-t border-gray-200">
					<slot name="form" />
				</div>
			</div>
		</div>
	</div>
{/if}
