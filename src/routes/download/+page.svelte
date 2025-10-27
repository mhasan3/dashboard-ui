<script>

import Navbar from '$lib/components/Navbar.svelte';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { isLoggedIn } from '$store/store.js';

import { superForm } from 'sveltekit-superforms';

// let { data } = $props();
export let data;
// Client API:
const { form } = superForm(data.form);

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
			<p class="text-black">Download page</p>
			<form method="POST">
				<label for="name">Name</label>
				<input type="text" name="name" bind:value={$form.name} />

				<label for="email">E-mail</label>
				<input type="email" name="email" bind:value={$form.email} />

				<div><button>Submit</button></div>
			</form>
		</main>
	</div>
{/if}