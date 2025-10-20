import daisyui from 'daisyui';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontSize: {
				'6x': '64px'
			},
			colors: {
				primary: '#161141',
				secondary: '#7E7E7E',
				active: '#00ff88',
				warning: '#5cc5f1'
			},
			fontFamily: {
				main: ['DM Sans', 'sans-serif']
			},
			lineHeight: {
				'6x': '64px',
				'7x': '72px'
			}
		}
	},
	plugins: [
		daisyui,
		forms({
			strategy: 'class'
		})
	]
};
