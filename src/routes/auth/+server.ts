import {
	WORKOS_CLIENT_ID,
	WORKOS_REDIRECT_URI,
  WORKOS_API_KEY
} from '$env/static/private';
import { AuthkitSignIn, initWorkOS } from '$utils/server/index.js'; // Should be imported from '@dasporal/svelte-authkit' in your project

export async function GET() {
  const workos = initWorkOS(WORKOS_API_KEY);
  const response = await AuthkitSignIn({
		workOSClientId: WORKOS_CLIENT_ID,
		workOSRedirectURI: WORKOS_REDIRECT_URI,
		workos: workos
	});

	return response;
}
