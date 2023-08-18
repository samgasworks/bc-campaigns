<script lang="ts">
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import Container from '$lib/Container.svelte';
	import Modal from '$lib/Modal.svelte';
	import { currentModal, loading } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	export let data: PageData


	const handleSubmit: SubmitFunction = () => {
		$loading = true;
		return async ({ result }) => {
			$loading = false;
			if (result.type === 'success') {
				await invalidate('supabase:auth');
				$currentModal = null;
			}
			await applyAction(result);
		};
	};
</script>

<svelte:head>
	<title>Campaigns | BCRV</title>
</svelte:head>

<Container>
	<div slot="title" class="flex justify-between items-center">
		<div class="text-xl font-semibold text-gray-900">
			Campaigns
		</div>
		<button on:click={() => $currentModal = 'new_campaign'} class="primary-button">
			<span class="mr-1.5">&#43;</span>Create New Campaign
		</button>
	</div> 
	<div slot="content"></div>
</Container>

<Modal trigger="new_campaign">
	<div slot="title">
		Create New Campaign
	</div> 
	<form method="POST" use:enhance={handleSubmit} slot="form" class="px-4 py-8 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-md border bg-red-50 border-red-500/50 text-red-700 text-sm font-medium">
						{$page.form.error}
					</div>
				</div>
			</dl>
		{/if}
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="campaign_name">Campaign Name</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="text" name="campaign_name" id="campaign_name" required class="standard-form" />
				</div>
			</div>
		</div>
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="source">Source</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<select name="source" id="source" required class="standard-form">
						<option disabled selected value=""></option>
						{#if data.sources && data.sources.length > 0}
						{#each data.sources as source}
						<option value={source.id}>{source.name}</option>
						{/each}
						{:else}
						<option disabled selected value="">No Sources</option>
						{/if}
					</select>
				</div>
			</div>
		</div>
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="medium">Medium</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<select name="medium" id="medium" required class="standard-form">
						<option disabled selected value=""></option>
						{#if data.mediums && data.mediums.length > 0}
						{#each data.mediums as medium}
						<option value={medium.id}>{medium.name}</option>
						{/each}
						{:else}
						<option disabled selected value="">No Mediums</option>
						{/if}
					</select>
				</div>
			</div>
		</div>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button">
					{$loading ? 'Loading...' : 'Create Campaign'}
				</button>
			</div>
		</dl>
	</form>
</Modal>