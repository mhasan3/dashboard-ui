<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ArrowRight } from 'svelte-lucide';

	const dispatch = createEventDispatcher();

	let termsAccepted = false;
</script>

<div class="flex flex-col text-left gap-5 text-gray-800 mt-10 p-6">
	<h2 class="text-2xl font-bold text-black">Verify Your Wallet Ownership</h2>

	<p class="text-gray-600">
		To confirm wallet ownership, you'll need to:
	</p>

	<ol class="space-y-4">
		<li>1. Send a small cryptocurrency transaction from your wallet</li>
		<li>2. Complete this step within 3 hours.</li>
	</ol>

	<p class="text-gray-600">
		Upon successful verification, this amount will be credited to your account balance.
	</p>

	<div class="form-control">
		<label class="label cursor-pointer justify-start gap-3 p-0">
			<input
				type="checkbox"
				class="checkbox checkbox-primary"
				bind:checked={termsAccepted}
			/>
			<span class="label-text">I confirm that I will only use wallets that belong to me.</span>
		</label>
	</div>

	<div class="flex flex-col items-center gap-3 pt-4">
		<!--
			- disabled attribute prevents click and makes element non-interactive
			- guard in on:click is an extra safety to ensure we don't dispatch when disabled
			- class:btn-disabled (daisyUI) and class:opacity-50 (tailwind) visually indicate disabled state
		-->
		<button
			class="btn btn-neutral"
			on:click={() => termsAccepted && dispatch('next')}
			disabled={!termsAccepted}
			aria-disabled={!termsAccepted}
			class:btn-disabled={!termsAccepted}
			class:opacity-50={!termsAccepted}
		>
			Continue
			<ArrowRight class="w-4 h-4" />
		</button>

		<button
			class="btn btn-link text-gray-500 no-underline"
			on:click={() => dispatch('cancel')}
		>
			Cancel
		</button>
	</div>
</div>