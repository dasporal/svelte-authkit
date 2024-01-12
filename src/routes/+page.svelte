<script lang="ts">
	import SvelteAuthKit from '$lib/components/SvelteAuthKit.svelte';
	import SignInButton from '$lib/components/SignInButton.svelte';
	import SignOutButton from '$lib/components/SignOutButton.svelte';

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
	<SignOutButton />
	<br />
	<br />
	<button on:click={signOut}>Sign out custom button</button>
{:else}
	<p>Not authenticated</p>
	<SignInButton />
	<br />
	<br />
	<button on:click={signIn}>Sign in custom button</button>
{/if}
