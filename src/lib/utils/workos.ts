import { WorkOS } from '@workos-inc/node';
import { WORKOS_API_KEY } from '$env/static/private';

export const workos: WorkOS = new WorkOS(WORKOS_API_KEY);
