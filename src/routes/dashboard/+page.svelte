<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import AccountHeader from '$lib/components/AccountHeader.svelte';
	import ActionCard from '$lib/components/ActionCard.svelte';
	import { isLoggedIn } from '$store/store.js';
	import { onMount } from 'svelte';
	// Import icons from svelte-lucide
	import {
		Landmark, ArrowRightLeft, ShieldCheck, FileText,
		Building, KeyRound, Banknote, UserCog, Link, Wallet
	} from 'svelte-lucide';
	import { goto } from '$app/navigation';

    const actions = [
		{
			title: 'Deposit',
			description: 'View funding instructions and complete deposit notification',
			icon: Landmark,
		},
		{
			title: 'Transfer Stock In',
			description: 'Zero cost transfer position',
			icon: ArrowRightLeft
		},
		{
			title: 'Security Center',
			description: 'Improve Account Security',
			icon: ShieldCheck
		},
		{
			title: 'Statement',
			description: 'View account transaction details',
			icon: FileText
		},
		{
			title: 'Corporate Actions',
			description: 'View and process corporate actions',
			icon: Building
		},
		{
			title: 'Withdrawal',
			description: 'Input Withdrawal Information',
			icon: Banknote
		},
		{
			title: 'Account Setting',
			description: 'Update of personal information and account',
			icon: UserCog
		},
		{
			title: 'Link Management',
			description: 'Deal with the relationship between accounts',
			icon: Link
		},
		{
			title: 'Bank Accounts',
			description: 'Manage My Bank Accounts',
			icon: Wallet
		},
	];

	onMount(() => {
		if (!$isLoggedIn) {
			goto('/login');
		}else{

		}
	});
</script>


{#if $isLoggedIn}
<div class="bg-gray-100 min-h-screen">
	<Navbar />
    <main class="container mx-auto">
			<AccountHeader />
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0 mb-6 p-6">
				{#each actions as action}
					<ActionCard
						title={action.title}
						description={action.description}
						icon={action.icon}
					/>
				{/each}
			</div>
		</main>
</div>
{/if}