import { user, isAuthenticated } from '../../stores/userStore.js';

export async function signIn() {
	const response = await fetch('/auth');
	if (response.ok && response.headers.get('location')) {
		window.location.href = response.headers.get('location') || '/error';
	}
}

export async function signOut() {
	const response = await fetch('/auth/sign-out', { method: 'POST' });
	if (response.ok) {
		window.location.href = '/';
	}
}

export async function verifyToken() {
	try {
		const response = await fetch('/auth/verify-token', { method: 'POST' });
		if (response.ok) {
			const data = await response.json();
			isAuthenticated.set(data.body.isAuthenticated);
			user.set(data.body.user);
		} else {
			console.error('Token verification failed:', response.status);
		}
	} catch (error) {
		console.error('Error during token verification:', error);
	}
}
