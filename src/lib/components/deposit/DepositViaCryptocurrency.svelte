<script>
	import { createEventDispatcher } from 'svelte';
	import bitcoinIconPath from '$lib/assets/bitcoin-btc-logo.svg';
	import ethPath from '$lib/assets/ethereum-eth-logo.svg';
	import usdtPath from '$lib/assets/tether-usdt-logo.svg';
	import pyusdPath from '$lib/assets/paypal-usd-pyusd-logo.svg';
	import usdcPath from '$lib/assets/usd-coin-usdc-logo.svg';

	const dispatch = createEventDispatcher();
	// Array of cryptocurrencies to render the list dynamically
	const cryptos = [
		{
			name: 'BTC',
			label: 'Bitcoin',
			icon: bitcoinIconPath,
			color: 'text-orange-400'
		},
		{
			name: 'ETH',
			label: 'Ethereum',
			icon: ethPath,
			color: 'text-gray-600'
		},
		{
			name: 'USDT',
			label: 'Tether',
			icon: usdtPath,
			color: 'text-green-500'
		},
		{
			name: 'USDC',
			label: 'USD Coin',
			icon: usdcPath,
			color: 'text-blue-500'
		},
		{
			name: 'PYUSD',
			label: 'PayPal USD',
			icon: pyusdPath,
			color: 'text-blue-700'
		},
	];

	// Handler function for selecting a cryptocurrency
	function selectCrypto(cryptoIcon) {
		console.log(`Selected cryptocurrency: ${cryptoIcon}`);
		dispatch('next', { icon: cryptoIcon })
	}
</script>

<div class="min-h-screen bg-white text-gray-800 p-6 mt-10">
	<div class="flex justify-center items-center">
		<div class="flex gap-2">
			<span class="h-2 w-2 rounded-full bg-gray-200" />
			<span class="h-2 w-2 rounded-full bg-gray-200" />
			<span class="h-2 w-2 rounded-full bg-green-400" />
			<span class="h-2 w-2 rounded-full bg-gray-200" />
		</div>
	</div>

	<h1 class="text-2xl font-semibold mb-6">Deposit via Cryptocurrency</h1>

	<section class="mb-8">
		<h2 class="text-base font-normal text-gray-500">Amount</h2>
		<div class="flex items-baseline space-x-2">
			<span class="text-4xl font-light">$1000</span>
			<span class="text-2xl font-light text-gray-400">SGD</span>
		</div>
<!--		<p class="text-sm mt-4">-->
<!--			Please complete this transaction within 3 hours. This amount will be added to your account.-->
<!--		</p>-->
		<!--		<p class="text-sm text-gray-500">This amount will be added to your account.</p>-->
	</section>

	<h2 class="text-lg font-semibold mb-4 mt-8">Select a cryptocurrency</h2>

	<section class="space-y-3">
		{#each cryptos as crypto (crypto.name)}
			<button
				class="w-full flex items-center justify-between border-1 border-gray-200 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
				on:click={() => selectCrypto(crypto.icon)}
			>
				<div class="flex items-center space-x-4">
					<div
						class="w-10 h-10 rounded-full flex items-center justify-center {crypto.color} bg-white shadow-sm ring-1 ring-gray-200"
					>
<!--						<span class="text-xl font-bold">{crypto.icon}</span>-->
						<img src={crypto.icon} alt={crypto.name} class="w-full h-full" />
					</div>
					<div class="text-left">
						<span class="font-bold block">{crypto.name}</span>
						<!--						<span class="text-sm text-gray-500">{crypto.label}</span>-->
					</div>
				</div>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		{/each}
	</section>
</div>