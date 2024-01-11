<script context="module">
	export async function signIn() {
		console.log('sign in');
		const response = await fetch('/auth');
		console.log(response);
		console.log('Should rediret to: ', response.headers.get('location'));
		if (response.ok && response.headers.get('location')) {
			window.location.href = response.headers.get('location') || '/error';
		}
	}
</script>

<button on:click={signIn}>Sign in component</button>
