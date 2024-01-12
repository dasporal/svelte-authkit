<script lang="ts">
	import SvelteAuthKit from '$lib/components/SvelteAuthKit.svelte';

	import { user, isAuthenticated } from '$lib/stores/userStore.js';
	import { signIn, signOut } from '$lib/index.js';

	$: if ($isAuthenticated) {
		console.log('User is authenticated', $user);
	} else {
		console.log('User is not authenticated');
	}
</script>

<SvelteAuthKit />

{#if $isAuthenticated}
	<p>Authenticated as {$user ? $user.firstName : ''}</p>
	<button on:click={signOut}>Sign out</button>
{:else}
	<p>Not authenticated</p>
	<button on:click={signIn}>Sign in</button>
{/if}
