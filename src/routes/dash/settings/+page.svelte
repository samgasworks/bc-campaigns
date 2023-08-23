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
		<div class="px-6 py-4 flex items-center justify-between">
			<div>
				{source.name}
			</div>
			{#if $page.data.account?.role > 5}
			<div class="flex justify-end space-x-4">
				<button on:click={() => $currentModal = `edit_${source.id}`} class="text-blue-500/50 hover:text-blue-500">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
						<path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
						<path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
					</svg>															
				</button>
				<button on:click={() => $currentModal = `delete_${source.id}`} class="text-red-500/50 hover:text-red-500">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
						<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
					</svg>							  
				</button>
			</div>
			{/if}
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
		<div class="px-6 py-4 flex items-center justify-between">
			<div>
				{medium.name}
			</div>
			{#if $page.data.account?.role > 5}
			<div class="flex justify-end space-x-4">
				<button on:click={() => $currentModal = `edit_${medium.id}`} class="text-blue-500/50 hover:text-blue-500">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
						<path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
						<path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
					</svg>															
				</button>
				<button on:click={() => $currentModal = `delete_${medium.id}`} class="text-red-500/50 hover:text-red-500">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
						<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
					</svg>							  
				</button>
			</div>
			{/if}
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
		<button on:click={() => $currentModal = 'send_invite'} class="primary-button">
			<span class="mr-1.5">&#43;</span>Add New User
		</button>
	</div> 
	<div slot="content" class="divide-y divide-gray-200 text-sm">
		{#if data.users}
		{#each data.users as user}
		{@const expired = Date.now() - new Date(user.created_at).getTime() > 86400000}
		<div class="px-6 py-4 grid grid-cols-3 items-center">
			<div class="{expired && !user.accepted_invite ? 'text-red-800/75' : 'text-gray-900'}">
				{user.first_name} {user.last_name}
			</div>
			<div class="flex items-center space-x-2 md:self-center">
				<div class="{expired && !user.accepted_invite ? 'text-red-800/75' : 'text-gray-900'}">
					{user.email}
				</div>
				{#if expired && !user.accepted_invite}
				<div class="text-sm font-normal text-red-600/50 bg-red-100 px-2 py-1 rounded-sm flex items-center space-x-1.5 shadow-sm">
					<span class="text-red-700">Invite Expired</span>
				</div>
				{:else if !user.accepted_invite}
				<div class="text-sm font-medium text-purple-600/50 bg-purple-100 px-2 py-1 rounded-sm flex items-center space-x-1.5 shadow-sm">
					<span class="text-purple-700">Invited</span>
				</div>
				{/if}
				{#if user.role === 10}
				<div class="text-sm font-normal text-green-600/50 bg-green-100 px-2 py-1 rounded-sm flex items-center space-x-1.5 shadow-sm">
					<span class="text-green-700">Admin</span>
				</div>
				{/if}
			</div>
			<div class="flex items-center justify-end space-x-2 md:self-center">
				{#if $page.data.session?.user.id !== user.id}
				<button on:click={() => ($currentModal = `${user.id}_remove_user`)} class="delete-button">
					Remove
				</button>
				{/if}
				{#if expired && !user.accepted_invite}
				<form method="POST" action="?/resendInvite" use:enhance={handleSubmit}>
					<input type="hidden" name="user_id" value={user.id} />
					<input type="hidden" name="email" value={user.email} />
					<button type="submit" disabled={$loading} class="text-black max-w-max primary-button">
						Resend Invite
					</button>
				</form>
				{:else}
				<button on:click={() => ($currentModal = `${user.id}_update_user`)} class="secondary-button">
					Update
				</button>
				{/if}
			</div>
		</div>
		{/each}
		{/if}
	</div>
</Container>

{#if data.sources}
{#each data.sources as source}
<Modal trigger="edit_{source.id}">
	<div slot="title">
		Edit {source.name}
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
		<input type="hidden" name="table" value="sources" />
		<input type="hidden" name="id" value={source.id} />
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="name">Name</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="text" value={source.name} name="name" id="name" required class="standard-form" />
				</div>
			</div>
		</div>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button">
					{$loading ? 'Loading...' : 'Edit Medium'}
				</button>
			</div>
		</dl>
	</form>
</Modal>
<Modal trigger="delete_{source.id}">
	<div slot="title">
		Delete {source.name}
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
		<input type="hidden" name="table" value="sources" />
		<input type="hidden" name="id" value={source.id} />
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
					{$loading ? 'Loading...' : 'Delete Source'}
				</button>
			</div>
		</dl>
	</form>
</Modal>
{/each}
{/if}

{#if data.mediums}
{#each data.mediums as medium}
<Modal trigger="edit_{medium.id}">
	<div slot="title">
		Edit {medium.name}
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
		<input type="hidden" name="table" value="mediums" />
		<input type="hidden" name="id" value={medium.id} />
		<div class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="name">Name</label>
				</dt>
				<div class="mt-1.5 flex rounded-md shadow-sm">
					<input type="text" value={medium.name} name="name" id="name" required class="standard-form" />
				</div>
			</div>
		</div>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button">
					{$loading ? 'Loading...' : 'Edit Medium'}
				</button>
			</div>
		</dl>
	</form>
</Modal>
<Modal trigger="delete_{medium.id}">
	<div slot="title">
		Delete {medium.name}
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
		<input type="hidden" name="table" value="mediums" />
		<input type="hidden" name="id" value={medium.id} />
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
					{$loading ? 'Loading...' : 'Delete Medium'}
				</button>
			</div>
		</dl>
	</form>
</Modal>
{/each}
{/if}

{#if data.users && data.users.length > 0}
{#each data.users as user}
<Modal trigger={`${user.id}_update_user`}>
	<span slot="title" class="flex items-center justify-center space-x-2">
			<span>Edit {user.email}</span>
		{#if $page.data.session?.user.email === user.email}
			<div class="text-sm font-medium text-amber-600/50 bg-amber-100 px-2 py-1 rounded-sm flex items-center space-x-1.5 shadow-sm">
				<span class="text-amber-700">You</span>
			</div>
		{/if}
	</span>
	<form method="POST" action="?/updateUser" use:enhance={handleSubmit} slot="form" class="px-4 py-6 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-sm border bg-red-50 border-red-500/50 text-red-700 text-sm font-medium">
						{$page.form.error}
					</div>
				</div>
			</dl>
		{/if}
		<input type="hidden" name="user_id" id="user_id" value={user.id} />
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="email">Coworker's Email</label>
				</dt>
				<dd class="mt-1 text-gray-900">
					<input disabled value={user.email} id="email" name="email" type="email" required class="block w-full border border-gray-200 rounded-sm shadow-sm text-sm font-medium bg-gray-50"
					/>
				</dd>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="first_name">Coworker's First Name</label>
				</dt>
				<dd class="mt-1 text-gray-900">
					<input value={user.first_name} id="first_name" name="first_name" type="text" autocomplete="off" required class="standard-form" />
				</dd>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="last_name">Coworker's Last Name</label>
				</dt>
				<dd class="mt-1 text-gray-900">
					<input value={user.last_name} id="last_name" name="last_name" type="text" autocomplete="off" required class="standard-form" />
				</dd>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="name">Role & Permissions</label>
				</dt>
				<select value={user.role} name="role" id="role" required class="standard-form">
					<option value={0}>Standard</option>
					<option value={10}>Admin</option>
				</select>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button"> Update User </button>
			</div>
		</dl>
	</form>
</Modal>
<Modal trigger="{user.id}_remove_user">
	<span slot="title">
		<span>Remove {user.email}</span>
	</span>
	<form method="POST" action="?/removeUser" use:enhance={handleSubmit} slot="form" class="px-4 py-6 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-sm border bg-red-50 border-red-500/50 text-red-700 text-sm font-medium">
						The name you typed does not match
					</div>
				</div>
			</dl>
		{/if}
		<input hidden name="user_id" value={user.id} />
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<div class="text-center mb-2 p-3 rounded-sm border bg-gray-50 border-gray5-200 text-gray-700 text-sm font-light space-y-2">
					<p>Are you sure? This will delete {user.email}</p>
				</div>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="confirm">
						Type 
						<span class="text-gray-700 font-medium">delete</span>
						then click the blue button
					</label>
				</dt>
				<dd class="mt-1 text-gray-900">
					<input type="text" id="confirm" name="confirm" required class="standard-form" />
				</dd>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="delete-button">
					Remove
				</button>
			</div>
		</dl>
	</form>
</Modal>
{/each}
{/if}

<Modal trigger="send_invite">
	<span slot="title"> Add Team Member </span>
	<form method="POST" action="?/sendInvite" use:enhance={handleSubmit} slot="form" class="px-4 py-6 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-sm">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-sm border bg-red-50 border-red-500/50 text-red-700 text-sm font-medium">
						{$page.form.error}
					</div>
				</div>
			</dl>
		{/if}
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<div class="text-center p-3 rounded-sm border bg-gray-50 border-gray-500/50 text-gray-700 text-sm font-light">
					If your coworker doesn't accept the invitation within <span class="font-normal">24 hours</span>, you will need to resend the invitation.
				</div>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="email">Coworker's Email</label>
				</dt>
				<dd class="mt-1 text-gray-900">
					<input id="email" name="email" type="email" autocomplete="off" required class="standard-form" />
				</dd>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="first_name">Coworker's First Name</label>
				</dt>
				<dd class="mt-1 text-gray-900">
					<input id="first_name" name="first_name" type="text" autocomplete="off" required class="standard-form" />
				</dd>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="last_name">Coworker's Last Name</label>
				</dt>
				<dd class="mt-1 text-gray-900">
					<input id="last_name" name="last_name" type="text" autocomplete="off" required class="standard-form" />
				</dd>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6">
				<dt class="text-sm font-normal text-gray-500 sm:self-center">
					<label for="name">Role & Permissions</label>
				</dt>
				<select name="role" id="role" required class="standard-form">
					<option value="0">Standard</option>
					<option value="10">Admin</option>
				</select>
			</div>
		</dl>
		<dl class="w-full max-w-lg">
			<div class="grid sm:px-6 mt-2">
				<button disabled={$loading} type="submit" class="full-width-button"> Send Invite </button>
			</div>
		</dl>
	</form>
</Modal>

<Modal trigger="new_source">
	<div slot="title">
		Add New Source
	</div> 
	<form action="?/new" method="POST" use:enhance={handleSubmit} slot="form" class="px-4 py-8 flex flex-col items-center justify-center space-y-4">
		{#if $page.form?.error}
			<dl class="w-full max-w-lg">
				<div class="grid sm:px-6">
					<div class="p-3 rounded-sm border bg-red-50 border-red-500/50 text-red-700 text-sm">
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
				<div class="mt-1.5 flex rounded-sm shadow-sm">
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
					<div class="p-3 rounded-sm border bg-red-50 border-red-500/50 text-red-700 text-sm">
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
				<div class="mt-1.5 flex rounded-sm shadow-sm">
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