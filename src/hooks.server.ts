// src/hooks.server.ts
import { workos } from '$lib/utils/workos.js'; // Update the path as necessary
import { WORKOS_CLIENT_ID, WORKOS_REDIRECT_URI, JWT_SECRET_KEY } from '$env/static/private';
import { SignJWT, jwtVerify } from 'jose';

const clientId = WORKOS_CLIENT_ID;
const secret = new Uint8Array(Buffer.from(JWT_SECRET_KEY, 'base64'));

export async function handle({ event, resolve }) {
	const url = new URL(event.url);

	// Intercept requests to the /auth route
	if (url.pathname === '/auth') {
		console.log('Authenticating with WorkOS');
		const authorizationUrl = workos.userManagement.getAuthorizationUrl({
			provider: 'authkit',
			redirectUri: WORKOS_REDIRECT_URI,
			clientId
		});
		console.log(authorizationUrl);

		// Redirect to the authorization URL
		return new Response(null, {
			status: 302,
			headers: { Location: authorizationUrl }
		});
	}

	if (url.pathname === '/auth/callback') {
		console.log('callback');
		const code = url.searchParams.get('code');
		if (!code) {
			return new Response('No code provided', { status: 400 });
		}

		try {
			const { user } = await workos.userManagement.authenticateWithCode({
				code,
				clientId
			});

			const token = await new SignJWT({ user })
				.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
				.setIssuedAt()
				.setExpirationTime('1h')
				.sign(secret);

			const response = new Response(null, {
				status: 302,
				headers: {
					Location: '/',
					'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`
				}
			});

			return response;
		} catch (error) {
			return new Response('Authentication failed', { status: 500 });
		}
	}

	if (url.pathname === '/auth/verify-token') {
		try {
			const token = event.cookies.get('token');
			const verifiedToken = await jwtVerify(token, secret);

			return new Response(
				JSON.stringify({
					status: 200,
					body: {
						isAuthenticated: true,
						user: verifiedToken.payload.user
					}
				})
			);
		} catch (error) {
			return new Response(
				JSON.stringify({
					status: 401,
					body: {
						isAuthenticated: false
					}
				})
			);
		}
	}

	if (url.pathname === '/auth/sign-out') {
		try {
			const headers = new Headers();
			headers.append(
				'Set-Cookie',
				'token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
			);

			return new Response(JSON.stringify({ isAuthenticated: false }), {
				status: 200,
				headers: headers
			});
		} catch (error) {
			return new Response(JSON.stringify({ isAuthenticated: true, error: 'Failed to sign out' }), {
				status: 500
			});
		}
	}

	return await resolve(event);
}
