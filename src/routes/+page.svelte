<script lang="ts">
	import SvelteAuthKit from '$lib/components/SvelteAuthKit.svelte';
  import SignInButton from '$lib/components/SignInButton.svelte';
  import SignOutButton from '$lib/components/SignOutButton.svelte';
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
{:else}
	<p>Not authenticated</p>
  <SignInButton />
{/if}
