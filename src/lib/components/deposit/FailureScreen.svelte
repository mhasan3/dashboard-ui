<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	// import { X, AlertOctagon } from 'svelte-lucide';

	export let reason: string = 'Unable to verify your wallet/document.';
	export let showModal: boolean = false; // Bind to parent's modal state

</script>


<div class="flex flex-col items-center text-center gap-4 text-gray-800 p-6 pt-10">
<!--	<AlertOctagon class="w-20 h-20 text-red-500 mb-4" />-->

	<h2 class="text-2xl font-bold text-red-700 mb-2">Verification Failed</h2>

	<p class="text-lg text-gray-700 mb-6 max-w-sm">
		{reason}
	</p>

	<button
		class="btn btn-soft max-w-xs text-white"
		on:click={() => (showModal = false)}
	>
		Close Window
	</button>

	<p class="text-sm text-gray-500 mt-4">
		If the issue persists, please contact support.
	</p>
</div>