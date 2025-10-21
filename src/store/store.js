import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const token = writable('');

if (browser) {
	const savedToken = localStorage.getItem('token');
	if (savedToken) {
		token.set(savedToken);
		isLoggedIn.set(true);
	}

	// persist token changes
	token.subscribe((value) => {
		if (value) localStorage.setItem('token', value);
		else localStorage.removeItem('token');
	});
}