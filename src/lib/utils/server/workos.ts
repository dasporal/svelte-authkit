import { WorkOS } from '@workos-inc/node';

/**
 * Returns a new instance of the WorkOS object.
 *
 * @param WORKOS_API_KEY
 * @returns A new instance of the WorkOS object.
 *
 * @example
 * const workos = initWorkOS('env_workos_api_key');
 */
export function initWorkOS(WORKOS_API_KEY: string) {
	return new WorkOS(WORKOS_API_KEY);
}
