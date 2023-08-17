<script lang='ts'>
	import Container from '$lib/Container.svelte';
	import Modal from '$lib/Modal.svelte';
	import { currentModal } from '$lib/utils';
</script>

<svelte:head>
	<title>Campaigns | BCRV</title>
</svelte:head>

<Container>
	<div slot="title" class="flex justify-between items-center">
		<div class="text-xl font-bold text-gray-900">
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
	<div slot="form"></div>
</Modal>