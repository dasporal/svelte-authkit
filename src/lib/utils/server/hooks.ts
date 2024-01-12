// src/hooks.server.ts
import { SignJWT, jwtVerify } from 'jose';

//const clientId: string = WORKOS_CLIENT_ID;

//const secret: Uint8Array = new Uint8Array(Buffer.from(JWT_SECRET_KEY, 'base64'));

export async function AuthkitSignIn({
	workOSClientId,
	workOSRedirectURI,
	workos
}: {
	workOSClientId: string;
	workOSRedirectURI: string;
	workos: unknown;
}) {
	console.log('Authenticating with WorkOS');
	const authorizationUrl = workos.userManagement.getAuthorizationUrl({
		provider: 'authkit',
		redirectUri: workOSRedirectURI,
		workOSClientId
	});

	console.log('Redirect to auth url', authorizationUrl);

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
	url: string | URL;
}) {
	url = new URL(url);
	console.log('Callback from WorkOS');
	const code = url.searchParams.get('code');
	if (!code) {
		return new Response('No code provided', { status: 400 });
	}

	try {
		const { user } = await workos.userManagement.authenticateWithCode({
			code,
			workOSClientId
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

export async function AuthkitVerifyToken({
	request,
	secret
}: {
	request: Request;
	secret: Uint8Array;
}) {
	console.log('verify token');
	try {
    const token = request.headers.get('cookie').split(';').find(c => c.trim().startsWith('token='));
		if (!token) {
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
