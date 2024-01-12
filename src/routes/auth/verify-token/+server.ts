import { JWT_SECRET_KEY } from '$env/static/private';
import { AuthkitVerifyToken } from '@dasporal/svelte-authkit';

const secret = new Uint8Array(Buffer.from(JWT_SECRET_KEY, 'base64'));

export async function POST({ request }){
    const response = await AuthkitVerifyToken({
        request: request,
        secret: secret
    })

    return response;
};
