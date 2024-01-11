import { WorkOS } from '@workos-inc/node';
import { WORKOS_API_KEY } from '$env/static/private';

const workos: WorkOS = new WorkOS(WORKOS_API_KEY);

export default workos;
