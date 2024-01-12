import { AuthkitSignOut } from '@dasporal/svelte-authkit';

export async function POST() {
	const response = await AuthkitSignOut();
	return response;
}
