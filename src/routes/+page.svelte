<script lang="ts">
	import SvelteAuthKit from '$lib/components/SvelteAuthKit.svelte';
	import SignInButton, { signIn } from '$lib/components/SignInButton.svelte';
	import SignOutButton, { signOut } from '$lib/components/SignOutButton.svelte';
	import { user, isAuthenticated } from '$lib/stores/userStore';

	$: if ($isAuthenticated) {
		console.log('User is authenticated', $user);
	} else {
		console.log('User is not authenticated');
	}
</script>

<SvelteAuthKit />

{#if $isAuthenticated}
	<p>Authenticated as {$user.firstName}</p>
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
