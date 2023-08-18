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
	<title>Settings | BCRV</title>
</svelte:head>

<Container>
	<div slot="title" class="flex justify-between items-center">
		<div class="text-xl font-semibold text-gray-900">
			Sources
		</div>
		<button on:click={() => $currentModal = 'new_source'} class="primary-button">
			<span class="mr-1.5">&#43;</span>Add New Source
		</button>
	</div> 
	<div slot="content" class="divide-y divide-gray-200 text-sm">
		{#if data.sources}
		{#each data.sources as source}
		<div class="px-6 py-4">
			{source.name}
		</div>
		{/each}
		{/if}
	</div>
</Container>

<Container>
	<div slot="title" class="flex justify-between items-center">
		<div class="text-xl font-semibold text-gray-900">
			Mediums
		</div>
		<button on:click={() => $currentModal = 'new_medium'} class="primary-button">
			<span class="mr-1.5">&#43;</span>Add New Medium
		</button>
	</div> 
	<div slot="content" class="divide-y divide-gray-200 text-sm">
		{#if data.mediums}
		{#each data.mediums as medium}
		<div class="px-6 py-4">
			{medium.name}
		</div>
		{/each}
		{/if}
	</div>
</Container>

<Container>
	<div slot="title" class="flex justify-between items-center">
		<div class="text-xl font-semibold text-gray-900">
			Users
		</div>
		<button on:click={() => $currentModal = 'new_user'} class="primary-button">
			<span class="mr-1.5">&#43;</span>Add New User
		</button>
	</div> 
	<div slot="content"></div>
</Container>

<Modal trigger="new_source">
	<div slot="title">
		Add New Source
	</div> 
	<form action="?/new" method="POST" use:enhance={handleSubmit} slot="form" class="px-4 py-8 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-md border bg-red-50 border-red-500/50 text-red-700 text-sm">
						{$page.form.error}
					</div>
				</div>
			</dl>
		{/if}
		<input type="hidden" name="table" value="sources" />
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="name">Name</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="text" name="name" id="name" required class="standard-form" />
				</div>
			</div>
		</div>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button">
					{$loading ? 'Loading...' : 'Add Source'}
				</button>
			</div>
		</dl>
	</form>
</Modal>

<Modal trigger="new_medium">
	<div slot="title">
		Add New Medium
	</div> 
	<form action="?/new" method="POST" use:enhance={handleSubmit} slot="form" class="px-4 py-8 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-md border bg-red-50 border-red-500/50 text-red-700 text-sm">
						{$page.form.error}
					</div>
				</div>
			</dl>
		{/if}
		<input type="hidden" name="table" value="mediums" />
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="name">Name</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="text" name="name" id="name" required class="standard-form" />
				</div>
			</div>
		</div>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button">
					{$loading ? 'Loading...' : 'Add Medium'}
				</button>
			</div>
		</dl>
	</form>
</Modal>