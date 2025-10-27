<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ArrowRight } from 'svelte-lucide';

	const dispatch = createEventDispatcher();

	// State for the checkbox
	let termsAccepted = false;

	function handleContinue() {
		// Only dispatch if terms are accepted
		if (termsAccepted) {
			dispatch('next');
		}
	}

	function handleCancel() {
		dispatch('cancel');
	}

</script>

<div class="flex flex-col text-left gap-5 text-gray-800 mt-10 p-6">
	<h2 class="text-2xl font-bold text-black">Triple-A Verification</h2>

	<p class="text-gray-600">
		To deposit funds to your trading account using cryptocurrency, you need to complete two
		verification steps:
	</p>

	<ol class="space-y-4">
		<li>
			<strong class="font-semibold text-black">1. Identity verification</strong>
			<p class="text-gray-600 mt-2">
				Submit a government-issued ID such as passport, national ID card, or driver's license.
			</p>
		</li>
		<li>
			<strong class="font-semibold text-black">2. Wallet verification</strong>
			<p class="text-gray-600 mt-2">
				Complete a small test transaction within 3 hours to verify wallet ownership. This amount will
				be added to your account balance.
			</p>
		</li>
	</ol>

	<p class="text-gray-600">
		This verification ensures secure transfers while meeting regulatory requirements.
	</p>

	<div class="form-control">
		<label class="label cursor-pointer justify-start gap-3 p-0">
			<input type="checkbox" class="checkbox checkbox-primary" bind:checked={termsAccepted} />
			<span class="label-text"
			>By proceeding, I agree to <a href="#" class="link link-primary"
			>Triple-A Terms and conditions</a
			></span
			>
		</label>
	</div>

	<div class="flex flex-col items-center gap-3 pt-4">
		<button class="btn btn-neutral"
						on:click={() => dispatch('next')}
						disabled={!termsAccepted}
						aria-disabled={!termsAccepted}
						class:btn-disabled={!termsAccepted}
						class:opacity-50={!termsAccepted}>
			Continue
			<ArrowRight class="w-4 h-4" />
		</button>
		<button class="btn btn-link text-gray-500 no-underline" on:click={() => dispatch('cancel')}
		>Cancel</button
		>
	</div>
</div>