<script lang="ts">
  async function signIn() {
		console.log('sign in');
		const response = await fetch('/auth');
    console.log(response)
    console.log("Should rediret to: ", response.headers.get('location'))
		if (response.ok && response.headers.get('location')) {
			window.location.href = response.headers.get('location');
		}
	}
</script>

<button on:click={signIn}>Sign in</button>