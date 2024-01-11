<script>
	import { onMount } from 'svelte';
	import { user, isAuthenticated } from '$lib/stores/userStore.js';

	async function verifyToken() {
			try {
					const response = await fetch('/auth/verify-token', { method: 'POST' });
					if (response.ok) {
							const data = await response.json();
							isAuthenticated.set(data.body.isAuthenticated);
							user.set(data.body.user);
					} else {
							console.error('Token verification failed:', response.status);
					}
			} catch (error) {
					console.error('Error during token verification:', error);
			}
	}

	onMount(() => {
			verifyToken();
	});
</script>
