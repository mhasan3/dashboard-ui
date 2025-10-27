<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ArrowRight, File, X } from 'svelte-lucide';

	const dispatch = createEventDispatcher();

	// State to track the selected file/state
	let selectedState: 'success' | 'failure' | null = null;
	let selectedFileName: string | null = null;
	let failureReason = 'The document uploaded could not be verified by the system. Please try again with a clear photo or a different document.';

	// --- Mock File Data ---
	const MOCK_SUCCESS_FILE = { name: 'Verified_Passport.pdf', state: 'success' };
	const MOCK_FAILURE_FILE = { name: 'Unverified_ID.png', state: 'failure' };
	// -----------------------

	function handleFileSelect(state: 'success' | 'failure') {
		if (state === 'success') {
			selectedState = 'success';
			selectedFileName = MOCK_SUCCESS_FILE.name;
		} else {
			selectedState = 'failure';
			selectedFileName = MOCK_FAILURE_FILE.name;
		}
	}

	function handleClear() {
		selectedState = null;
		selectedFileName = null;
	}

	function handleContinue() {
		if (selectedState === 'success') {
			// SUCCESS PATH: Dispatches 'next' to move to the next logical step (e.g., Step 5)
			dispatch('next');
		} else if (selectedState === 'failure') {
			// FAILURE PATH: Dispatches a custom 'failure' event with details
			dispatch('failure', { reason: failureReason });
			// dispatch('next');
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
		<li class="mt-1">National Identity Card</li>
		<li class="mt-1">Driving License</li>
	</ol>

	<div class="pt-4 border-t border-gray-100">
		<h3 class="font-bold text-sm text-red-600 mb-2">DEV MODE: Select Flow</h3>

		<div class="flex gap-3 mb-4">
			<button
				on:click={() => handleFileSelect('success')}
				class="flex-1 btn btn-sm border-green-500 text-green-700 bg-green-50 hover:bg-green-100"
			>
<!--				<CheckCircle class="w-4 h-4" /> Success Flow-->
			</button>

			<button
				on:click={() => handleFileSelect('failure')}
				class="flex-1 btn btn-sm border-red-500 text-red-700 bg-red-50 hover:bg-red-100"
			>
<!--				<AlertTriangle class="w-4 h-4" /> Failure Flow-->
			</button>
		</div>
	</div>
	{#if selectedFileName}
		<div
			class="flex items-center justify-between p-4 bg-gray-100 border rounded-lg"
			class:border-green-500={selectedState === 'success'}
			class:border-red-500={selectedState === 'failure'}
		>
			<div class="flex items-center gap-3 overflow-hidden">
				<File
					class="w-6 h-6 flex-shrink-0 {selectedState === 'failure' ? 'text-red-500' : 'text-primary'}"
				/>
				<span class="font-medium text-sm truncate" title={selectedFileName}>{selectedFileName}</span>
			</div>
			<button class="btn btn-xs btn-ghost btn-circle" on:click={handleClear}>
				<X class="w-4 h-4" />
			</button>
		</div>
	{:else}
		<p class="text-sm text-gray-500 text-center py-4">
			(Or click a button above to simulate file selection)
		</p>
	{/if}

	<div class="flex flex-col items-center gap-3 pt-4">
		<button
			class="btn btn-neutral"
			class:opacity-50={!selectedState}
			class:pointer-events-none={!selectedState}
			disabled={!selectedState}
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