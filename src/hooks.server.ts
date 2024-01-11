// src/hooks.server.ts
import { initWorkOS } from '$lib/utils/server/workos.js';
import {
	WORKOS_CLIENT_ID,
	WORKOS_REDIRECT_URI,
	WORKOS_API_KEY,
	JWT_SECRET_KEY
} from '$env/static/private';
import {
	createAuthHook,
	createCallbackHook,
	createSignOutHook,
	createVerifyTokenHook
} from '$lib/utils/server/hooks.js';

const secret: Uint8Array = new Uint8Array(Buffer.from(JWT_SECRET_KEY, 'base64'));
const workos = initWorkOS(WORKOS_API_KEY);

export async function handle({ event, resolve }) {
	const url = new URL(event.url);

	await createAuthHook({
		workOSClientId: WORKOS_CLIENT_ID,
		workOSRedirectURI: WORKOS_REDIRECT_URI,
		workos: workos,
		url: event.url
	});

	await createCallbackHook({
		workOSClientId: WORKOS_CLIENT_ID,
		secret: secret,
		workos: workos,
		url: event.url
	})

	await createSignOutHook(url)

	await createVerifyTokenHook({
		event: event,
		secret: secret
	})

	return await resolve(event);
}
