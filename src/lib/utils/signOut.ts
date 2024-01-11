export async function signOut() {
  console.log('sign out');
		const response = await fetch('/auth/sign-out', { method: 'POST' });
		if (response.ok) {
			window.location.href = '/';
		}
}
