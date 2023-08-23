<script lang="ts">
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import Container from '$lib/Container.svelte';
	import Modal from '$lib/Modal.svelte';
	import { currentModal, loading } from '$lib/utils';
	import { applyAction, enhance } from '$app/forms';
	import { invalidate, goto } from '$app/navigation';

	export let data: PageData

	function padCampaignId(number: number, width: number = 6) {
		return new Array(width + 1 - (number + '').length).join('0') + number;
	}

	const handleSubmit: SubmitFunction = ({ action }) => {
		$loading = true;
		return async ({ result }) => {
			$loading = false;
			if (result.type === 'success') {
				await invalidate('supabase:auth');
				$currentModal = null;
				if (action.search.indexOf('setPassword') > 0) {
					goto('/dash');
				}
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
	<table slot="content" class="min-w-full table-auto">
		{#if data.campaigns && data.sources && data.mediums && data.campaigns.length > 0}
		<thead>
			<tr class="border-b border-gray-200 bg-gray-50 rounded-t-md text-xs font-medium text-gray-900">
				<th scope="col" class="px-4 py-2 text-left sm:pl-6">
					ID
				</th>
				<th scope="col" class="px-4 py-2 text-left">
					Source
				</th>
				<th scope="col" class="px-4 py-2 text-left">
					Medium
				</th>
				<th scope="col" class="px-4 py-2 text-left">
					Name
				</th>
				<th scope="col" class="px-4 py-2 text-left">
					URL
				</th>
				{#if $page.data.account?.role > 5}
				<th scope="col" class="px-4 py-2 text-left sm:pr-6">
				</th>
				{/if}
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200 text-gray-700 text-sm font-light">
			{#each data.campaigns as campaign}
			{@const source = data.sources.find(s => s.id === campaign.source)}
			{@const medium = data.mediums.find(m => m.id === campaign.medium)}
			<tr class="">
				<td class="p-4 sm:pl-6">
					{padCampaignId(campaign.id)}
				</td>
				<td class="p-4">
					{source ? source.name : ''}
				</td>
				<td class="p-4">
					{medium ? medium.name : ''}
				</td>
				<td class="p-4">
					{campaign.name}
				</td>
				<td class="p-4 w-1/2">
					<p class="select-all px-2 py-1.5 bg-blue-100 border border-blue-200 font-base rounded-sm">
						{campaign.url}?utm_source={source ? source.name : ''}&utm_medium={medium ? medium.name : ''}&utm_campaign={campaign.name}&utm_id={padCampaignId(campaign.id)}
					</p>
				</td>
				{#if $page.data.account?.role > 5}
				<td class="p-4 sm:pr-6">
					<div class="flex justify-end space-x-4">
						<button on:click={() => $currentModal = `edit_${campaign.id}`} class="text-blue-500/50 hover:text-blue-500">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
								<path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
								<path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
							</svg>															
						</button>
						<button on:click={() => $currentModal = `delete_${campaign.id}`} class="text-red-500/50 hover:text-red-500">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
								<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
							</svg>							  
						</button>
					</div>
				</td>
				{/if}
			</tr>
			{/each}
		</tbody>
		{/if}
	</table>
</Container>

{#if data.campaigns && data.sources && data.mediums && data.campaigns.length > 0}
{#each data.campaigns as campaign}
{@const source = data.sources.find(s => s.id === campaign.source)}
{@const medium = data.mediums.find(m => m.id === campaign.medium)}
<Modal trigger="edit_{campaign.id}">
	<div slot="title">
		Edit {campaign.name}
	</div> 
	<form action="?/edit" method="POST" use:enhance={handleSubmit} slot="form" class="px-4 py-8 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-md border bg-red-50 border-red-500/50 text-red-700 text-sm font-medium">
						{$page.form.error}
					</div>
				</div>
			</dl>
		{/if}
		<input type="hidden" name="campaign_id" value={campaign.id} />
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="destination_url">Destination URL</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="url" value={campaign.url} name="destination_url" id="destination_url" required class="standard-form" />
				</div>
			</div>
		</div>
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="campaign_name">Campaign Name</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="text" value={campaign.name} name="campaign_name" id="campaign_name" required class="standard-form" />
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
						{#if source}
						<option selected value={source.id}>{source.name}</option>
						{:else}
						<option disabled selected value=""></option>
						{/if}
						{#if data.sources && data.sources.length > 0}
						{#each data.sources as source}
						{#if source.id !== campaign.source}
						<option value={source.id}>{source.name}</option>
						{/if}
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
						{#if medium}
						<option selected value={medium.id}>{medium.name}</option>
						{:else}
						<option disabled selected value=""></option>
						{/if}
						{#if data.mediums && data.mediums.length > 0}
						{#each data.mediums as medium}
						{#if medium.id !== campaign.medium}
						<option value={medium.id}>{medium.name}</option>
						{/if}
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
					{$loading ? 'Loading...' : 'Edit Campaign'}
				</button>
			</div>
		</dl>
	</form>
</Modal>
<Modal trigger="delete_{campaign.id}">
	<div slot="title">
		Delete {campaign.name}
	</div> 
	<form action="?/delete" method="POST" use:enhance={handleSubmit} slot="form" class="px-4 py-8 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-md border bg-red-50 border-red-500/50 text-red-700 text-sm font-medium">
						{$page.form.error}
					</div>
				</div>
			</dl>
		{/if}
		<input type="hidden" name="campaign_id" value={campaign.id} />
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="confirm">To confirm, type <span class="font-medium text-gray-700">delete</span> and click the blue button</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="text" name="confirm" id="confirm" required class="standard-form" />
				</div>
			</div>
		</div>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button">
					{$loading ? 'Loading...' : 'Delete Campaign'}
				</button>
			</div>
		</dl>
	</form>
</Modal>
{/each}
{/if}

<Modal trigger="new_campaign">
	<div slot="title">
		Create New Campaign
	</div> 
	<form action="?/new" method="POST" use:enhance={handleSubmit} slot="form" class="px-4 py-8 flex flex-col items-center justify-center space-y-4">
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
					<label for="destination_url">Destination URL</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="url" name="destination_url" id="destination_url" required class="standard-form" />
				</div>
			</div>
		</div>
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
