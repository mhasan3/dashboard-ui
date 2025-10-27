<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronRight } from 'svelte-lucide';

	export let options: { name: string; subtext?: string; icon: string; code: string }[] = [];

	const dispatch = createEventDispatcher();

	function selectCurrency(currencyCode: string) {
		dispatch('select', currencyCode);
	}
</script>

<h3 class="font-bold text-xl text-center mb-6 text-black">Choose Deposit Currency</h3>
<div class="flex flex-col gap-3">
	{#each options as option, i}
		<button
			on:click={() => selectCurrency(option.code)}
			class="flex items-center w-full text-left p-4 rounded-xl transition-colors {i === 1
				? 'bg-yellow-50'
				: 'bg-white'} hover:bg-gray-100 border"
		>
			{#if option.name === 'DDA'}
				<div
					class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white text-sm mr-4 flex-shrink-0"
				>
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