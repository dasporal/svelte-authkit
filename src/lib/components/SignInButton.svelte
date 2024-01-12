<script context="module">
	import { signIn } from '$utils/client/auth'; // Should be imported from '@dasporal/svelte-authkit' in your project
</script>

<button on:click={signIn}>Sign in component</button>
