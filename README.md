# Svelte Authkit

CURRENTLY NOT WORKING AS AN INSTALLED PACKAGE. It is my first one after all. :frowning:

Svelte library aimed at helping implement [WorkOS's Authkit](https://www.authkit.com/) and [their User Management service](https://workos.com/docs/user-management) in a Svelte application.

## Installation

```shell
npm i @dasporal/svelte-authkit
```

## Usage

**Environment variables**

- `WORKOS_CLIENT_ID`: WorkOS Client ID
- `WORKOS_API_KEY`: WorkOS API key as provided by AuthKit
- `WORKOS_REDIRECT_URI`: Redirect URI as setup in the dashboard (should look like something `https://domain.tld/auth/callback` or `http://localhost:PORT/auth/callback` for staging environment)
- `JWT_SECRET_KEY`: [Following WorkOS' guidelines](https://workos.com/docs/user-management/3-handle-the-user-session/create-a-signing-secret) on how to create a secret key.

Add the `SvelteAuthKit` component to your root `+layout.svelte` file.

```typescript
<script lang="ts">
    import { SvelteAuthKit } from '@dasporal/svelte-authkit';
</script>

<SvelteAuthKit />
<slot />
```

This component will initialize on each app mount to retrieve the user. It will then store the data in the `userStore`, with its property being accessible by importing `import { user, isAuthenticated } from '$lib/stores/userStore';` on the relevant components and pages.

The `signIn` and `signOut` functions from `$lib/utils/client/auth.ts` and `$lib/utils/client/auth.ts` can be applied to any custom component you may have, and it is not planned for the moment to provide more beautiful button than already present in the integration example at [`src/routes/+page.svelte`](./src/routes/+page.svelte).


The library expects 4 new routes to be created, for each server function:
- `/auth`: sits at `/src/routes/auth/+server.ts`
- `/auth/callback`: sits at `/src/routes/auth/callback/+server.ts`
- `/auth/verify-token`: sits at `/src/routes/auth/verify-token/+server.ts`
- `/auth/sign-out`: sits at `/src/routes/auth/sign-out/+server.ts`


I am currently writing the documentation, but an example of expected setup can be browsed in this repo at `src/routes` 

## Todo

- Tests
- Type the variable
- Write proper documentation
