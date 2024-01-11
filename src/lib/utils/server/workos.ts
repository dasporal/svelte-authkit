import { WorkOS } from '@workos-inc/node';

export function initWorkOS(WORKOS_API_KEY: string){
  return new WorkOS(WORKOS_API_KEY);
}