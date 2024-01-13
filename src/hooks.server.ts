import {
	WORKOS_CLIENT_ID,
	WORKOS_REDIRECT_URI,
	WORKOS_API_KEY,
	JWT_SECRET_KEY
} from '$env/static/private';
import {
	AuthkitCallback,
	AuthkitSignIn,
	AuthkitSignOut,
	AuthkitVerifyToken,
} from '$utils/server/hooks.js';

import {
	initWorkOS
} from '$utils/server/workos.js';

const secret: Uint8Array = new Uint8Array(Buffer.from(JWT_SECRET_KEY, 'base64'));
const workos = initWorkOS(WORKOS_API_KEY);

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/auth/verify-token')) {
    console.log("Checking token")
		const response = await AuthkitVerifyToken({
			event: event,
			secret: secret
		});

		return response;
	}

	if (event.url.pathname.startsWith('/auth/callback')) {
		return AuthkitCallback({
			workOSClientId: WORKOS_CLIENT_ID,
			workos: workos,
			url: event.url,
			secret: secret
		});
	}

	if (event.url.pathname.startsWith('/auth/sign-out')) {
		const response = await AuthkitSignOut();
		return response;
	}

	if (event.url.pathname.startsWith('/auth')) {
		const response = await AuthkitSignIn({
			workOSClientId: WORKOS_CLIENT_ID,
			workOSRedirectURI: WORKOS_REDIRECT_URI,
			workos: workos
		});

		return response;
	}

	const response = await resolve(event);
	return response;
}
