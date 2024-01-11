<script lang="ts">
  async function signIn() {
		console.log('sign in');
		const response = await fetch('/auth');
		if (response.ok && response.headers.get('location')) {
			window.location.href = response.headers.get('location');
		}
	}
</script>

<button on:click={signIn}>Sign in</button>