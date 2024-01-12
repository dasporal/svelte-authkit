<script>
	import { onMount } from 'svelte';
	import { verifyToken } from '$utils/client/auth';

	onMount(() => {
		verifyToken();
	});
</script>
