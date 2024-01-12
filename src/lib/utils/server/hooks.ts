// src/hooks.server.ts
import { SignJWT, jwtVerify } from 'jose';

export async function AuthkitSignIn({
	workOSClientId,
	workOSRedirectURI,
	workos
}: {
	workOSClientId: string;
	workOSRedirectURI: string;
	workos: unknown;
}) {
	const authorizationUrl = workos.userManagement.getAuthorizationUrl({
		provider: 'authkit',
		clientId: workOSClientId,
		redirectUri: workOSRedirectURI,
	});

	return new Response(null, {
		status: 200,
		headers: {
			Location: authorizationUrl
		}
	});
}

export async function AuthkitCallback({
	workOSClientId,
	workos,
	secret,
	url
}: {
	workOSClientId: string;
	workos: unknown;
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
		console.log(error)
		return new Response('Authentication failed', { status: 500 });
	}
}

export async function AuthkitVerifyToken({
	request,
	secret
}: {
	request: Request;
	secret: Uint8Array;
}) {
	try {
		const token = request.headers.get('cookie').split(';').find(c => c.trim().startsWith('token=')).split('=')[1];
		if (!token) {
			console.log("No token")
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
