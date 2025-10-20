import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			$store: path.resolve(__dirname, './src/store')
		}
	},
	plugins: [tailwindcss(), sveltekit()]
});
