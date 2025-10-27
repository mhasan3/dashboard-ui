<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronRight, RefreshCw } from 'svelte-lucide';

	export let methods: any[] = [];
	export let selectedCurrency: string = '';

	const dispatch = createEventDispatcher();

	function selectMethod(methodTitle: string) {
		dispatch('select', methodTitle);
	}
</script>

<h3 class="font-bold text-xl text-center mb-6 text-gray-900">Deposit with {selectedCurrency}</h3>
<div class="flex flex-col gap-4">
	{#each methods as method}
		<button
			on:click={() => selectMethod(method.title)}
			class="card {method.isHighlighted
				? 'bg-yellow-10'
				: 'bg-white'} border rounded-xl p-4 text-left hover:shadow-lg transition-shadow"
		>
			<div class="flex items-center gap-4">
				<div
					class="w-12 h-12 rounded-full {method.bgColor} flex items-center justify-center font-bold text-black/70 text-xs flex-shrink-0"
				>
					{#if method.iconType === 'icon'}
<!--						<RefreshCw class="text-gray-400" />-->
						<div class="text-gray-400 w-5 h-5">
							{@html method.icon}
						</div>
					{:else}
						{method.icon}
					{/if}
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