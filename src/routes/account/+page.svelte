<script>

import Navbar from '$lib/components/Navbar.svelte';
import AccountHeader from '$lib/components/AccountHeader.svelte';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { isLoggedIn } from '$store/store.js';

onMount(() => {
	if (!$isLoggedIn) {
		goto('/login');
	}
});
</script>

{#if $isLoggedIn}
	<div class="bg-gray-100 min-h-screen">
		<Navbar />
		<main class="container mx-auto">
			<p class="text-black">account page</p>

		</main>
	</div>
{/if}