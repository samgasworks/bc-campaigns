<script lang="ts">
	export let background = 'white';
</script>

<div class="
	{background === 'white' ?  'shadow-sm bg-white border-gray-200' : ''}
	{background === 'info' ?  'border-dotted bg-white/75 border-gray-200' : ''}
	{background === 'danger' ?  'bg-red-50 border-red-200/75 opacity-75 hover:opacity-100' : ''}
	max-w-7xl w-full mx-auto rounded-md border">
	<div class="px-6 py-4 border-b border-gray-200">
		<slot name="title" />
	</div>
	<slot name="content" />
</div>
