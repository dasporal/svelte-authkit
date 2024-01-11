<script lang="ts">
	import { onMount } from 'svelte';

	async function verifyToken() {
		const response = await fetch('/api/verify-token', { method: 'POST' });
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			isAuthenticated = data.body.isAuthenticated;
			user = data.body.user;
		}
	}

  onMount(() => {
		verifyToken();
	});
</script>