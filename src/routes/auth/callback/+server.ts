import {
	WORKOS_CLIENT_ID,
  WORKOS_API_KEY,
  JWT_SECRET_KEY
} from '$env/static/private';
import { AuthkitCallback, initWorkOS } from '@dasporal/svelte-authkit';

const secret: Uint8Array = new Uint8Array(Buffer.from(JWT_SECRET_KEY, 'base64'));

export async function GET({ url }) {
  const workos = initWorkOS(WORKOS_API_KEY);

  return AuthkitCallback({
		workOSClientId: WORKOS_CLIENT_ID,
		workos: workos,
    url: url,
    secret: secret
	});
}
