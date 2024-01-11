<script lang="ts">
	import { onMount } from 'svelte';
	import { user, isAuthenticated } from '$lib/stores/userStore';

	async function verifyToken() {
		const response = await fetch('/auth/verify-token', { method: 'POST' });
		if (response.ok) {
			const data = await response.json();
			isAuthenticated.set(data.body.isAuthenticated);
			user.set(data.body.user);
		}
	}

	onMount(() => {
		verifyToken();
	});
</script>
