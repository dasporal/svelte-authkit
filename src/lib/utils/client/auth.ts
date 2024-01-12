import { user, isAuthenticated } from '../../stores/userStore.js';

/**
 * Asynchronous function that initiates the sign in process.
 *
 * This function sends a GET request to the '/auth' endpoint and redirects the user to the location specified in the response headers.
 *
 * @example
 * await signIn();
 */
export async function signIn() {
	const response = await fetch('/auth');
	if (response.ok && response.headers.get('location')) {
		window.location.href = response.headers.get('location') || '/error';
	}
}

/**
 * Asynchronous function that initiates the sign out process.
 *
 * This function sends a POST request to the '/auth/sign-out' endpoint and redirects the user to the homepage upon successful sign out.
 *
 * @example
 * await signOut();
 */
export async function signOut() {
	const response = await fetch('/auth/sign-out', { method: 'POST' });
	if (response.ok) {
		window.location.href = '/';
	}
}

/**
 * Asynchronous function that verifies the user's token.
 *
 * This function sends a POST request to the '/auth/verify-token' endpoint. If the response is OK, it updates the `isAuthenticated` and
 * `user` stores with the data received from the response. If the response is not OK, it logs an error message with the response status.
 * If an error occurs during the fetch operation, it logs an error message with the error.
 *
 * @example
 * await verifyToken();
 */
export async function verifyToken(): Promise<null> {
	try {
		const response = await fetch('/auth/verify-token', { method: 'POST' });
		if (response.ok) {
			const data = await response.json();
			isAuthenticated.set(data.body.isAuthenticated);
			user.set(data.body.user);
		} else {
			console.error('Token verification failed:', response.status);
		}
		return null;
	} catch (error) {
		console.error('Error during token verification:', error);
		return null;
	}
}
