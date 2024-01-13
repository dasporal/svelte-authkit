// src/hooks.server.ts
import { SignJWT, jwtVerify } from 'jose';
import type { WorkOS } from '@workos-inc/node';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Asynchronous function that generates an authorization URL and Response for a WorkOS client.
 *
 * @param params - An object containing the necessary parameters to generate the authorization URL.
 * @param params.workOSClientId - The WorkOS client ID.
 * @param params.workOSRedirectURI - The redirect URI after successful authentication.
 * @param params.workos - The instance of the WorkOS object.
 *
 * @returns A new instance of the Response object. This response contains a 200 status and the authorization URL in the "Location" header.
 *
 * @example
 * const response = await AuthkitSignIn({
 *     workOSClientId: 'your_workos_client_id',
 *     workOSRedirectURI: 'your_redirect_uri',
 *     workos: your_workos_instance
 * });
 */
export async function AuthkitSignIn({
	workOSClientId,
	workOSRedirectURI,
	workos
}: {
	workOSClientId: string;
	workOSRedirectURI: string;
	workos: WorkOS;
}) {
	const authorizationUrl = workos.userManagement.getAuthorizationUrl({
		provider: 'authkit',
		clientId: workOSClientId,
		redirectUri: workOSRedirectURI
	});

	return new Response(null, {
		status: 200,
		headers: {
			Location: authorizationUrl
		}
	});
}

/**
 * Asynchronous function that handles the callback from the WorkOS authentication process and returns to the homepage.
 *
 * @param params - An object containing the necessary parameters to handle the callback.
 * @param params.workOSClientId - The WorkOS client ID.
 * @param params.workos - The instance of the WorkOS object.
 * @param params.secret - The secret used to sign the JWT.
 * @param params.url - The URL containing the code parameter.
 *
 * @returns  A new instance of the Response object. This response contains a 302 status and the root URL ("/") in the "Location" header.
 *
 * @example
 * const response = await AuthkitCallback({
 *     workOSClientId: 'env_workos_client_id',
 *     workos: workos_instance,
 *     secret: secret,
 *     url: callback_url
 * });
 */
export async function AuthkitCallback({
	workOSClientId,
	workos,
	secret,
	url
}: {
	workOSClientId: string;
	workos: WorkOS;
	secret: Uint8Array;
	url: URL;
}) {
	const code = url.searchParams.get('code');

	if (!code) {
		console.log('No code provided');
		return new Response('No code provided', { status: 400 });
	}

	try {
		const { user } = await workos.userManagement.authenticateWithCode({
			code,
			clientId: workOSClientId
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
		console.log(error);
		return new Response('Authentication failed', { status: 500 });
	}
}

/**
 * Asynchronous function that verifies the stored token containing user inforomations.
 *
 * @param params - An object containing the necessary parameters to verify the token.
 * @param params.event - The RequestEvent containing the token.
 * @param params.secret - The instance of the WorkOS object.
 *
 * @returns  A new instance of the Response object. This response contains the verification status and the decoded token if the user is logged in, otherwise it will return isAuthenticated with a false value.
 *
 * @example
 * const response = await AuthkitVerifyToken({
 *     event: event,
 *     secret: secret
 * });
 */
export async function AuthkitVerifyToken({
	event,
	secret
}: {
	event: RequestEvent;
	secret: Uint8Array;
}) {
	try {
		const token: string | null = (() => {
			const cookieHeader = event.request.headers.get('cookie');
			if (cookieHeader === null || cookieHeader === undefined) return null;

			const tokenCookie = cookieHeader.split(';').find((c) => c.trim().startsWith('token='));
			if (tokenCookie === undefined) return null;
			return tokenCookie.split('=')[1];
		})();

		if (token === null) {
			console.log('No token');
			return new Response(
				JSON.stringify({
					status: 401,
					body: {
						isAuthenticated: false
					}
				})
			);
		}

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

/**
 * Asynchronous function that handles the sign out process from the WorkOS authentication.
 *
 * @returns  A new instance of the Response object. This response contains a 302 status and the root URL ("/") in the "Location" header, indicating a successful sign out.
 *
 * @example
 * const response = await AuthkitSignOut();
 */
export async function AuthkitSignOut() {
	try {
		const headers = new Headers();
		headers.append('Set-Cookie', 'token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT');

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
