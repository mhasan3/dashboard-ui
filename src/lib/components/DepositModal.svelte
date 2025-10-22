<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'svelte-lucide';

	// This prop controls the modal's visibility from the parent page
	export let showModal = false;

	// These variables manage the internal state of the modal
	let step = 1;
	let selectedCurrency = '';
	let selectedMethodTitle = '';

	// --- Data for Step 1: Currency Selection ---
	const currencyOptions = [
		{ name: 'DDA', subtext: 'Available for 8 banks of Singapore', icon: 'DDA', code: 'DDA' },
		{ name: 'Deposit with SGD', icon: '🇸🇬', code: 'SGD' },
		{ name: 'Deposit with USD', icon: '🇺🇸', code: 'USD' },
		{ name: 'Deposit with HKD', icon: '🇭🇰', code: 'HKD' },
		{ name: 'Deposit with AUD', icon: '🇦🇺', code: 'AUD' },
		{ name: 'Deposit with EUR', icon: '🇪🇺', code: 'EUR' },
	];

	// --- Data for Step 2: Transfer Method Selection (Example for SGD) ---
	const transferMethods = [
		{
			icon: 'BANK TRANSFER',
			bgColor: 'bg-yellow-400',
			title: 'Bank Transfer',
			subtitle: 'Available in SGP and worldwide',
			details: [
				{ label: 'Should Arrive in', value: '2Hrs – 2 business Days' },
				{ label: 'Fee', value: 'Free for SGD local tranfer' },
				{ label: 'Advantage', value: 'Available for Fast, PayNow, TT, etc.' },
			]
		},
		{
			icon: '⇗',
			bgColor: 'bg-green-200',
			title: 'Transfer with Wise',
			subtitle: 'Available for non-SGP Bank accounts',
			details: [
				{ label: 'Advantage', value: 'One-time linkage & Faster and cheaper Transfer from non-SGP Banks.' },
			]
		},
		{
			icon: 'A',
			bgColor: 'bg-indigo-200',
			title: 'Pay with Cryptocurrency',
			subtitle: 'Available in SGP and worldwide',
			isHighlighted: true,
			details: [
				{ label: 'Advantage', value: 'Instant settlement with no bank account needed' },
			]
		},
	];

	function handleSelectCurrency(currencyCode: string) {
		selectedCurrency = currencyCode;
		step = 2; // Move to the next step
	}

	function handleSelectMethod(methodTitle: string) {
		selectedMethodTitle = methodTitle;
		step = 3; // Move to the final step
	}

	function goBack() {
		if (step > 1) {
			step--; // Go back one step
		}
	}

	// Reset to step 1 when the modal is closed
	$: if (!showModal) {
		setTimeout(() => step = 1, 300); // Delay reset to allow closing animation
	}

</script>

<input type="checkbox" id="deposit_modal" class="modal-toggle" bind:checked={showModal} />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box relative bg-white">
		{#if step > 1}
			<button on:click={goBack} class="btn btn-sm absolute left-4 top-4">
				<ChevronLeft class="w-4 h-4" /> Back
			</button>
		{/if}

		<button class="btn btn-sm btn-circle absolute right-2 top-2" on:click={() => showModal = false}>✕</button>

		{#if step === 1}
			<h3 class="font-bold text-xl text-center mb-6 text-black">Choose Deposit Currency</h3>
			<div class="flex flex-col gap-3">
				{#each currencyOptions as option, i}
					<button
						on:click={() => handleSelectCurrency(option.code)}
						class="flex items-center w-full text-left p-4 rounded-xl transition-colors {i === 1 ? 'bg-yellow-50' : 'bg-white'} hover:bg-gray-100 border"
					>
						{#if option.name === 'DDA'}
							<div class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white text-sm mr-4 flex-shrink-0">
								{option.icon}
							</div>
						{:else}
							<div class="w-10 h-10 text-3xl mr-4 flex-shrink-0">{option.icon}</div>
						{/if}
						<div class="flex-grow">
							<p class="font-semibold text-gray-900">{option.name}</p>
							{#if option.subtext}
								<p class="text-sm text-gray-900">{option.subtext}</p>
							{/if}
						</div>
						<ChevronRight class="text-gray-400" />
					</button>
				{/each}
			</div>
		{/if}

		{#if step === 2}
			<h3 class="font-bold text-xl text-center mb-6 text-gray-900">Deposit with {selectedCurrency}</h3>
			<div class="flex flex-col gap-4">
				{#each transferMethods as method}
					<button on:click={() => handleSelectMethod(method.title)} class="card {method.isHighlighted ? 'bg-yellow-50' : 'bg-base-900 '} border rounded-xl p-4 text-left hover:shadow-lg transition-shadow">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 rounded-full {method.bgColor} flex items-center justify-center font-bold text-black/70 text-xs flex-shrink-0">
								{method.icon}
							</div>
							<div class="flex-grow">
								<p class="font-semibold text-gray-800">{method.title}</p>
								<p class="text-sm text-gray-500">{method.subtitle}</p>
							</div>
							<ChevronRight class="text-gray-400" />
						</div>
						{#if method.details.length > 0}
							<div class="divider my-3"></div>
							<div class="space-y-2 text-sm">
								{#each method.details as detail}
									<div class="flex justify-between items-start gap-4">
										<span class="text-gray-500">{detail.label}</span>
										<span class="text-gray-800 font-medium text-right">{detail.value}</span>
									</div>
								{/each}
							</div>
						{/if}
					</button>
				{/each}
			</div>
		{/if}
		{#if step === 3}
			<h3 class="font-bold text-xl text-center mb-6">Choose Deposit Currency</h3>
			<button on:click={() => handleSelectMethod('step 4')} class="card 'bg-base-100' border rounded-xl p-4 text-left hover:shadow-lg transition-shadow">
				<div class="flex items-center gap-4">Next</div>
			</button>
			{/if}
		{#if step === 4}
			<h3 class="font-bold text-xl text-center mb-4">{selectedMethodTitle}</h3>
			<div class="space-y-4 p-4 border rounded-lg bg-gray-50">
				<p>This is the final step where you would show specific instructions for depositing with <strong>{selectedMethodTitle}</strong>.</p>
				<button class="btn btn-primary w-full mt-4">Proceed</button>
			</div>
		{/if}

	</div>
	<label class="modal-backdrop" for="deposit_modal" on:click={() => showModal = false}>Close</label>
</div>