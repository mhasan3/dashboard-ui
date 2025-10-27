<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	// Change 'UploadCloud' to 'Upload' here
	import { ArrowRight, Upload, File, X } from 'svelte-lucide';

	const dispatch = createEventDispatcher();

	let selectedFile: File | null = null;
	let fileInput: HTMLInputElement;

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			selectedFile = target.files[0];
		}
	}

	function handleContinue() {
		if (selectedFile) {
			dispatch('next', { file: selectedFile });
		}
	}
</script>

<div class="flex flex-col text-left gap-5 text-gray-800 mt-10 p-6">
	<div class="flex justify-center items-center">
		<div class="flex gap-2">
			<span class="h-2 w-2 rounded-full bg-gray-200" />
			<span class="h-2 w-2 rounded-full bg-green-400" />
			<span class="h-2 w-2 rounded-full bg-gray-200" />
			<span class="h-2 w-2 rounded-full bg-gray-200" />
		</div>
	</div>

	<h2 class="text-2xl font-bold text-black">Upload Identification Document</h2>

	<p class="text-gray-600">Please provide one of the following:</p>

	<ol class="space-y-1 list-decimal list-inside text-gray-600">
		<li class="mt-0">Passport</li>
		<li class="mt-6">National Identity Card</li>
		<li class="mt-6">Driving License</li>
	</ol>

	<input
		type="file"
		class="hidden"
		bind:this={fileInput}
		on:change={handleFileSelect}
		accept=".jpg,.jpeg,.png,.pdf"
	/>

	{#if !selectedFile}
		<button
			on:click={() => fileInput.click()}
			class="flex flex-col items-center justify-center p-8 mt-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
		>
			<Upload class="w-10 h-10 text-gray-400 mb-2" />
			<span class="font-semibold text-black">Upload File</span>
			<span class="text-sm text-gray-500">.jpg, .jpeg, .png or .pdf file</span>
		</button>
	{:else}
		<div
			class="flex items-center justify-between p-4 mt-4 bg-gray-100 border border-gray-200 rounded-lg"
		>
			<div class="flex items-center gap-3 overflow-hidden">
				<File class="w-6 h-6 text-primary flex-shrink-0" />
				<span class="font-medium text-sm truncate" title={selectedFile.name}>{selectedFile.name}</span>
			</div>
			<button class="btn btn-xs btn-ghost btn-circle" on:click={() => (selectedFile = null)}>
				<X class="w-4 h-4" />
			</button>
		</div>
	{/if}

	<div class="flex flex-col items-center gap-3 pt-4">
		<button
			class="btn btn-neutral"
			class:opacity-50={!selectedFile}
			class:pointer-events-none={!selectedFile}
			disabled={!selectedFile}
			on:click={handleContinue}
		>
			Continue
			<ArrowRight class="w-4 h-4" />
		</button>
		<button class="btn btn-link text-gray-500 no-underline" on:click={() => dispatch('cancel')}
		>Cancel</button
		>
	</div>
</div>