<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Data for the transaction fields (kept for context)
	const totalAmount = '$2.29 SGD';
	const amountDue = '$1.74002 USDC (Polygon)';
	const walletAddress = '0xe8f04c75b331c309987d161f2ec1bec32170437a';

	// --- Timer Logic ---
	const initialDuration = 10; // 3 minutes in seconds
	let duration = initialDuration;
	let interval;
	export let selectedIcon: string;

	// Format seconds into MM:SS
	function formatTime(seconds) {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	}

	function goBack() {
		dispatch('back'); // This is the key action
	}

	onMount(() => {
		interval = setInterval(() => {
			if (duration > 0) {
				duration -= 1;
			} else {
				clearInterval(interval);
				dispatch('next');
				// Handle timer expiration (e.g., disable transaction)
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	// --- Other Handlers and Placeholders (kept for context) ---
	function handleCopy() {
		navigator.clipboard.writeText(walletAddress).then(() => {
			alert('Wallet address copied to clipboard!');
		}).catch(err => {
			console.error('Failed to copy address:', err);
			alert('Failed to copy address. See console for details.');
		});
	}

	function scanSimplified() {
		alert("Scanning simplified QR code functionality goes here!");
	}

	// NOTE: You must place a valid QR code image in the correct path for it to display.
	const qrCodePlaceholder = '/qr_img.png';

</script>

<div class="min-h-screen bg-white text-gray-800 p-6 mt-10">
	<div class="flex justify-center items-center">
		<div class="flex gap-2">
			<span class="h-2 w-2 rounded-full bg-gray-200" />
			<span class="h-2 w-2 rounded-full bg-gray-200" />
			<span class="h-2 w-2 rounded-full bg-gray-200" />
			<span class="h-2 w-2 rounded-full bg-green-400" />
		</div>
	</div>

	<h1 class="text-2xl font-semibold mb-8">Verify Your Wallet Ownership</h1>

	<div class="form-control mb-6">
		<label class="label pt-0 pb-1">
			<span class="label-text text-base font-normal text-gray-500">Total</span>
		</label>
		<input type="text" value={totalAmount} class="input input-bordered w-full bg-white text-base font-normal shadow-sm" readonly/>
	</div>

	<div class="form-control mb-6">
		<label class="label pt-0 pb-1">
			<span class="label-text text-base font-normal text-gray-500">Amount Due</span>
		</label>
		<input type="text" value={amountDue} class="input input-bordered w-full bg-white text-base font-semibold shadow-sm" readonly/>
	</div>

	<div class="form-control mb-6">
		<label class="label pt-0 pb-2">
			<span class="label-text text-base font-normal text-gray-500">Please send to address</span>
		</label>
		<div class="flex items-center border border-gray-300 rounded-lg p-3">
      <span class="flex-grow text-sm font-medium text-gray-700 break-all pr-10">
        {walletAddress}
      </span>
			<button class="btn btn-sm btn-primary bg-gray-900 border-gray-900 text-white hover:bg-gray-800" on:click={handleCopy}>
				Copy
			</button>
		</div>
	</div>

	<div class="bg-white p-0 flex items-start text-sm mb-8 mt-4">
		<span class="mr-2">⚠️ Important: Transaction must be sent via Polygon network from a wallet you own</span>
		<span class="flex-1 text-gray-700 font-medium">

    </span>
	</div>

	<p class="text-gray-500 mb-4">or scan the QR code:</p>

	<div class="flex justify-center mb-8">
		<div class="relative w-64 h-64">
			<img
				src={qrCodePlaceholder}
				alt="QR Code for payment"
				class="w-full h-full object-contain border border-gray-300 p-2 rounded-lg"
				style="filter: grayscale(100%); opacity: 0.8;"
			/>
			<div class="absolute inset-0 flex items-center justify-center w-full h-full">
				<div class="w-12 h-12 rounded-full p-1 bg-white" style="box-shadow: 0 0 0 2px white;">
					<img src={selectedIcon} alt="Crypto Icon" class="w-full h-full object-contain" />
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center mt-6 mb-8 text-center">
		<div class="font-light text-gray-400 mb-6">
			{formatTime(duration)}
		</div>

		<p class="text-gray-500 mb-8 p-6">
			Facing issues?
			<button on:click={scanSimplified} class="link link-hover text-gray-500 p-0 underline font-semibold">
				Click
			</button>
			to scan simplified QR code.
		</p>

		<button class="btn  bg-gray-900 text-white hover:bg-gray-800 max-w-sm border-none" on:click={goBack}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Back
		</button>
	</div>
</div>