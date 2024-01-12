import { JWT_SECRET_KEY } from '$env/static/private';
import { AuthkitVerifyToken } from '$utils/server/index.js'; // Should be imported from '@dasporal/svelte-authkit' in your project

const secret = new Uint8Array(Buffer.from(JWT_SECRET_KEY, 'base64'));

export async function POST({ request }) {
	const response = await AuthkitVerifyToken({
		request: request,
		secret: secret
	});

	return response;
}
