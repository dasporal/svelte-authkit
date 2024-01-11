<script>
	import { onMount } from 'svelte';
	import { verifyToken } from '$lib/utils/client/auth.js';

	onMount(() => {
			verifyToken();
	});
</script>
