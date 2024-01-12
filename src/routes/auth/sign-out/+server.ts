import { AuthkitSignOut } from '$utils/server/index.js'; // Should be imported from '@dasporal/svelte-authkit' in your project

export async function POST() {
	const response = await AuthkitSignOut();
	return response;
}
