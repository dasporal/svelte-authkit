# Svelte Authkit

Svelte library aimed at helping implement [WorkOS's Authkit](https://www.authkit.com/) and [their User Management service](https://workos.com/docs/user-management) in a Svelte application.

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

An integration example is available in `src/lib/+page.svelte`.

## Todo

- Tests
- Type the variable