<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	// You need to re-import these icons for the buttons and upload area
	import { ArrowRight, File, X, Upload} from 'svelte-lucide';

	const dispatch = createEventDispatcher();

	// State to track the selected file/state
	let selectedState: 'success' | 'failure' | null = null;
	let selectedFile: File | null = null; // Use the actual File object
	let fileInput: HTMLInputElement; // Bind to the file input element

	let failureReason = 'The document uploaded could not be verified by the system. Please try again with a clear photo or a different document.';

	// --- Mock File Data (Kept for DEV MODE only) ---
	const MOCK_SUCCESS_FILE_NAME = 'Verified_Passport.pdf';
	const MOCK_FAILURE_FILE_NAME = 'Unverified_ID.png';
	// -----------------------------------------------

	/**
	 * Handles file selection either from the file input (e) or the DEV MODE buttons (state).
	 */
	function handleFileSelect(eOrState: Event | 'success' | 'failure') {
		let file: File | null = null;

		if (typeof eOrState === 'string') {
			// 1. DEV MODE BUTTON CLICK
			selectedState = eOrState;
			selectedFile = { name: eOrState === 'success' ? MOCK_SUCCESS_FILE_NAME : MOCK_FAILURE_FILE_NAME } as File;

		} else {
			// 2. ACTUAL FILE INPUT CHANGE
			const target = eOrState.target as HTMLInputElement;
			if (target.files && target.files.length > 0) {
				file = target.files[0];
				selectedFile = file;

				// --- CORE LOGIC: CHECK FILENAME FOR SUCCESS/FAILURE ---
				// Convert filename to lowercase for case-insensitive check
				const fileNameLower = file.name.toLowerCase();

				if (fileNameLower.includes('success') || fileNameLower.includes('verified')) {
					selectedState = 'success';
				} else {
					selectedState = 'failure';
				}
				// Reset input value so the same file can be uploaded again
				fileInput.value = '';
			}
		}
	}

	function handleClear() {
		selectedState = null;
		selectedFile = null;
	}

	function handleContinue() {
		if (!selectedState || !selectedFile) return;

		if (selectedState === 'success') {
			dispatch('next');
		} else if (selectedState === 'failure') {
			// Send the failure event
			dispatch('failure', { reason: failureReason });
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
			<p class="text-xs text-blue-500 mt-2">
				To test the flow: Upload a file with "success" or "verified" in its name.
			</p>
		</button>
	{:else}
		<div
			class="flex items-center justify-between p-4 mt-4 bg-gray-100 border rounded-lg"
			class:border-green-500={selectedState === 'success'}
			class:border-red-500={selectedState === 'failure'}
		>
			<div class="flex items-center gap-3 overflow-hidden">
				<File
					class="w-6 h-6 flex-shrink-0 {selectedState === 'failure' ? 'text-red-500' : 'text-primary'}"
				/>
				<span class="font-medium text-sm truncate" title={selectedFile.name}>{selectedFile.name}</span>

			</div>
			<button class="btn btn-xs btn-ghost btn-circle" on:click={handleClear}>
				<X class="w-4 h-4" />
			</button>
		</div>
		<p class="text-xs mt-2"
			 class:text-green-600={selectedState === 'success'}
			 class:text-red-600={selectedState === 'failure'}>
			Flow detected:
			{#if selectedState === 'success'}
				Success.
			{:else}
				Failure.
			{/if}
		</p>
	{/if}

<!--	<div class="pt-4 border-t border-gray-100 mt-4">-->
<!--		<h3 class="font-bold text-sm text-red-600 mb-2">DEV MODE: Select Flow (Manual Override)</h3>-->

<!--		<div class="flex gap-3 mb-4">-->
<!--			<button-->
<!--				on:click={() => handleFileSelect('success')}-->
<!--				class="flex-1 btn btn-sm border-green-500 text-green-700 bg-green-50 hover:bg-green-100"-->
<!--			>-->
<!--&lt;!&ndash;				<CheckCircle class="w-4 h-4" /> Success Flow&ndash;&gt;-->
<!--			</button>-->

<!--			<button-->
<!--				on:click={() => handleFileSelect('failure')}-->
<!--				class="flex-1 btn btn-sm border-red-500 text-red-700 bg-red-50 hover:bg-red-100"-->
<!--			>-->
<!--&lt;!&ndash;				<AlertTriangle class="w-4 h-4" /> Failure Flow&ndash;&gt;-->
<!--			</button>-->
<!--		</div>-->
<!--	</div>-->

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