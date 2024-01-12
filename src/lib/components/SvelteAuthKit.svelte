<script>
	import { onMount } from 'svelte';
	import { verifyToken } from '$utils/client/auth'; // Should be imported from '@dasporal/svelte-authkit' in your project

	onMount(() => {
		verifyToken();
	});
</script>
