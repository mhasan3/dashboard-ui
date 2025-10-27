<script lang="ts">
	// You might want to dispatch an event when verification is theoretically "done"
	// For this example, it's just a static display.
	// import { createEventDispatcher } from 'svelte';
	// const dispatch = createEventDispatcher();
	// function finishVerification() {
	//   dispatch('verified');
	// }

	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const initialDuration = 10; // 3 minutes in seconds
	let duration = initialDuration;
	let interval;

	// Format seconds into MM:SS
	function formatTime(seconds) {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		interval = setInterval(() => {
			if (duration > 0) {
				duration -= 1;
			} else {
				clearInterval(interval);
				dispatch('next');
				console.log('next')
				// Handle timer expiration (e.g., disable transaction)
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="text-gray-800 p-6 pr-5 mt-10">
	<h1 class="text-2xl font-semibold">Wallet Verification Underway</h1>
</div>

<div class="flex flex-col items-center justify-center min-h-[400px] text-gray-800 p-6">

	<p class="text-lg mb-12 max-w-sm mx-auto">
		We've detected your payment and are now verifying your wallet ownership.
	</p>

	<div class="relative w-48 h-48 flex items-center justify-center mb-16">
		<div class="absolute inset-0 flex items-center justify-center animate-spin-slow">
			{#each Array(8) as _, i}
				<div
					class="absolute w-1 h-8 rounded-full bg-gray-200 origin-bottom-left"
					style="transform: rotate({i * 45}deg) translate(0, -60px);"
				></div>
			{/each}
			<div
				class="absolute w-1 h-8 rounded-full bg-blue-500 origin-bottom-left animate-pulse-line-blue"
				style="transform: rotate(270deg) translate(0, -60px);"
			></div>
			<div
				class="absolute w-1 h-8 rounded-full bg-green-400 origin-bottom-left animate-pulse-line-green"
				style="transform: rotate(315deg) translate(0, -60px);"
			></div>
		</div>

		<div class="w-20 h-22 flex items-center justify-center relative z-10">
			<svg viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
				<path d="M7.75178 16.0898H0.972656V22.869H7.75178V16.0898Z" fill="#06FC88"></path>
				<path
					d="M28.1447 0.123375L14.2267 0.0957031V6.04473H18.2388L7.75195 33.2166H15.1122L17.4918 26.9355H31.05L33.3466 33.2166H40.7621L28.1447 0.123375ZM19.4287 20.9865L24.2709 8.06463L29.0301 20.9865H19.4287Z"
					fill="#0E0848"
				></path>
			</svg>
		</div>
	</div>
	<div class="font-light text-gray-400 mb-6">
		{formatTime(duration)}
	</div>
	<p class="text-lg text-gray-500 mt-12">
		This typically takes 1-2 minutes to complete.
	</p>
</div>

<style>
    /* Define custom keyframe animations */
    @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /*
			For a more dynamic look, you can have the blue/green lines
			pulse or have a slightly different animation speed/delay
			relative to the main spin.
		*/
    @keyframes pulse-line-blue {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    @keyframes pulse-line-green {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; } /* Slight difference for variation */
    }

    .animate-spin-slow {
        animation: spin-slow 10s linear infinite; /* Adjust speed as desired */
    }
    .animate-pulse-line-blue {
        animation: pulse-line-blue 2s ease-in-out infinite;
    }
    .animate-pulse-line-green {
        animation: pulse-line-green 2s ease-in-out infinite 0.5s; /* Staggered delay */
    }
</style>