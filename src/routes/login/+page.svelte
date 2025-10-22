<script>
	import { goto } from '$app/navigation';
	import { isLoggedIn, token } from '$store/store.js';

	import { base_url } from '$store/server.js';

	let email = '';
	let password = '';
	let togglePasswordShow = false;

	async function handleSubmit() {
		try {
			if (!email || !password) {
				alert('Please enter valid email address or password');
				return;
			}

			const response = await fetch(`${$base_url}/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			// validate success response
			if (!response.ok) {
				alert('login failed');
				return;
			}

			const data = await response.json();

			token.set(data.token);

			localStorage.setItem('token', data.token);
			let userToken = localStorage.getItem('token');
			if (userToken) {
				console.log(userToken);
				isLoggedIn.set(true);
			}

			goto('/dashboard');
		} catch (error) {
			goto('/login');
		}
	}

	function handlePasswordVisibility() {
		togglePasswordShow = !togglePasswordShow;
	}
</script>

<svelte:head>
	<title>Login | Dashboard UI</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary to-secondary flex">
	<div class="w-full flex items-center justify-center p-8 bg-base-100">
		<div class="w-full max-w-md">
			<div class="card bg-base-100 shadow-xl border border-base-200 space-y-0">
				<div class="text-center mb-0 mt-6">
					<img src="/tigerbrokers.svg" alt="Tigerbrokers Logo" class="w-1/2 h-1/2 mx-auto mb-2.5" />
				</div>

				<div class="text-center mb-0 mt-6">
					<h1
						class="lg:text-4xl md:text-2xl text-xl text-primary capitalize font-normal mb-1.5 lg:leading-10 pl-[1.015rem]"
					>
						Welcome Back.
					</h1>
					<p class="text-base-content/70">Sign in to your account to continue</p>
				</div>
				<div class="card-body mt-0">
					<form on:submit|preventDefault={handleSubmit} class="space-y-6">
						<div class="form-control">
							<label class="label" for="email">
								<span class="label-text font-medium">Email Address</span>
							</label>
							<input
								id="email"
								type="email"
								placeholder="Enter your email"
								class="input input-bordered input-primary w-full focus:input-primary"
								bind:value={email}
								autocomplete="email"
							/>
						</div>

						<div class="form-control !mt-3">
							<label class="label" for="password">
								<span class="label-text font-medium">Password</span>
							</label>
							<div class="relative">
								{#if togglePasswordShow}
									<input
										id="password"
										type="text"
										placeholder="Enter your password"
										class="input input-bordered input-primary w-full pr-12 focus:input-primary"
										bind:value={password}
										autocomplete="current-password"
									/>
								{:else}
									<input
										id="password"
										type="password"
										placeholder="Enter your password"
										class="input input-bordered input-primary w-full pr-12 focus:input-primary"
										bind:value={password}
										autocomplete="current-password"
									/>
								{/if}

								<button
									type="button"
									class="btn btn-ghost btn-sm absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
									on:click={handlePasswordVisibility}
									aria-label={togglePasswordShow ? 'Hide password' : 'Show password'}
								>
									{#if togglePasswordShow}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
											></path>
										</svg>
									{:else}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											></path>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											></path>
										</svg>
									{/if}
								</button>
							</div>
						</div>

						<div class="form-control">
							<button
								type="submit"
								class="btn btn-primary w-full gap-2 {!email || !password ? 'btn-disabled' : ''}"
								disabled={!email || !password}
							>
								<span>Login</span>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									></path>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
