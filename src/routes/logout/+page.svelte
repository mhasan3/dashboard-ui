<script>
	import { onMount } from 'svelte';

	import { token, isLoggedIn } from '$store/store.js';

	onMount(() => {
		isLoggedIn.set(false);
		token.set('');
		localStorage.removeItem('token');

		window.location.href = '/login';
	});
</script>
