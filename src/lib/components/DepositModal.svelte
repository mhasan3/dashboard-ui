<script lang="ts">
	import { ChevronLeft } from 'svelte-lucide';
	// Import the new step components
	import CurrencySelector from './deposit/CurrencySelector.svelte';
	import MethodSelector from './deposit/MethodSelector.svelte';
	import Verification from './deposit/Verification.svelte';
	import IdUpload from '$lib/components/deposit/IdUpload.svelte';
	import VerifyWallet from '$lib/components/deposit/VerifyWallet.svelte';
	import VerifyWalletOwnership from '$lib/components/deposit/VerifyWalletOwnership.svelte';
	import TransactionDetails from '$lib/components/deposit/TransactionDetails.svelte';
	import WalletVerificationUnderway from '$lib/components/deposit/WalletVerificationUnderway.svelte';
	import DepositViaCryptocurrency from '$lib/components/deposit/DepositViaCryptocurrency.svelte';
	import FailureScreen from '$lib/components/deposit/FailureScreen.svelte';
	import { transferMethods } from '$lib/data/transferMethodsData';

	export let showModal = false;

	// State Management
	let step = 1;
	let selectedCurrency = '';
	let failureReason = '';
	let selectedCryptoIconPath: string = '';
	//
	function handleFailure(event: CustomEvent<{ reason: string }>) {
		failureReason = event.detail.reason;
		step = 10; // Jump to the new failure step
	}

	// Data (kept in the parent component to be passed down as props)
	const currencyOptions = [
		{ name: 'DDA', subtext: 'Available for 8 banks of Singapore', icon: 'DDA', code: 'DDA' },
		{ name: 'Deposit with SGD', icon: '🇸🇬', code: 'SGD' },
		{ name: 'Deposit with USD', icon: '🇺🇸', code: 'USD' },
		{ name: 'Deposit with HKD', icon: '🇭🇰', code: 'HKD' },
		{ name: 'Deposit with AUD', icon: '🇦🇺', code: 'AUD' },
		{ name: 'Deposit with EUR', icon: '🇪🇺', code: 'EUR' }
	];

	// Event Handlers
	function handleCurrencySelected(event: CustomEvent<string>) {
		selectedCurrency = event.detail;
		step = 2;
	}

	function handleMethodSelected() {
		step = 3;
	}

	function handlePlaceholderNext() {
		step = 4;
	}

	function handleIdUploadNext(){
		step = 5;
	}

	function handleVerifyWalletNext(){
		step = 6;
	}

	function handleVerifyWalletOwnershipNext(event: CustomEvent<string>){
		selectedCryptoIconPath = event.detail.icon; // Save the icon path
		console.log('Selected Icon Path:', selectedCryptoIconPath);
		step = 7;
	}

	function handleTransactionDetailsNext(){
		step = 8;
	}

	function handleNextFromVerification(){
		step = 9;
	}

	function handleJumpToStepSix(event: CustomEvent<string>) {
		selectedCryptoIconPath = event.detail.icon; // Save the icon path
		console.log('Selected Icon Path:', selectedCryptoIconPath);
		step = 7;
	}

	function goBack() {
		if (step > 1) {
			step--;
		}
	}

	// Reset to step 1 when the modal is closed
	$: if (!showModal) {
		setTimeout(() => (step = 1), 300);
	}
</script>

<input type="checkbox" id="deposit_modal" class="modal-toggle" bind:checked={showModal} />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box relative bg-white">
		{#if step > 1 && step !==10 }
			<button on:click={goBack} class="btn btn-sm absolute left-4 top-4">
				<ChevronLeft class="w-4 h-4" /> Back
			</button>
		{/if}
		<button
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (showModal = false)}>✕</button
		>

		{#if step === 1}
			<CurrencySelector options={currencyOptions} on:select={handleCurrencySelected} />
		{/if}

		{#if step === 2}
			<MethodSelector
				methods={transferMethods}
				{selectedCurrency}
				on:select={handleMethodSelected}
			/>
		{/if}

		{#if step === 3}
			<Verification on:next={handlePlaceholderNext} on:cancel={() => (showModal = false)} />
		{/if}

		{#if step === 4}
			<IdUpload
				on:next={handleIdUploadNext}
				on:cancel={() => (showModal = false)}
				on:failure={handleFailure}  />
		{/if}

		{#if step === 5}
			<VerifyWallet on:next={handleVerifyWalletNext} />
		{/if}

		{#if step === 6}
			<VerifyWalletOwnership on:next={handleVerifyWalletOwnershipNext} />
		{/if}

		{#if step === 7}
			<TransactionDetails
				selectedIcon={selectedCryptoIconPath}
				on:next={handleTransactionDetailsNext}
				on:back={goBack}
			/>
		{/if}

		{#if step === 8}
			<WalletVerificationUnderway on:next={handleNextFromVerification}/>
		{/if}

		{#if step === 9}
			<DepositViaCryptocurrency on:next={handleJumpToStepSix} />
		{/if}

		{#if step === 10}
			<FailureScreen reason={failureReason} bind:showModal />
		{/if}
	</div>

	<button class="modal-backdrop" on:click={() => (showModal = false)}>Close</button>
</div>