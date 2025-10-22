<script lang="ts">
	import type { Component } from "svelte";
	import type { SvelteComponent } from "svelte";

	export let title: string;
	export let description: string;
	export let icon: Component<SvelteComponent>;
</script>

<button class="relative w-full h-full block box-border bg-white border border-gray-200
  hover:border-gray-300 shadow-sm hover:shadow-md transition-all text-left p-6" >
    <div class="flex items-start gap-4">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svelte:component this={icon} class="w-8 h-8 text-gray-500" />
        </div>
        <div>
            <h2 class="text-gray-800 font-semibold mb-1">{title}</h2>
            <p class="text-sm text-gray-500 leading-6">{description}</p>
        </div>
    </div>
</button>