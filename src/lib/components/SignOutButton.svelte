<script context="module">
	import { signOut } from '$utils/client/auth'; // Should be imported from '@dasporal/svelte-authkit' in your project
</script>

<button on:click={signOut}>Sign out component</button>
