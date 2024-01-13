[@dasporal/svelte-authkit](README.md) / Exports

# @dasporal/svelte-authkit

## Table of contents

### Variables

- [isAuthenticated](/docs/svelte-authkit/modules#isauthenticated)
- [user](/docs/svelte-authkit/modules#user)

### Functions

- [AuthkitCallback](/docs/svelte-authkit/modules#authkitcallback)
- [AuthkitSignIn](/docs/svelte-authkit/modules#authkitsignin)
- [AuthkitSignOut](/docs/svelte-authkit/modules#authkitsignout)
- [AuthkitVerifyToken](/docs/svelte-authkit/modules#authkitverifytoken)
- [initWorkOS](/docs/svelte-authkit/modules#initworkos)
- [signIn](/docs/svelte-authkit/modules#signin)
- [signOut](/docs/svelte-authkit/modules#signout)
- [verifyToken](/docs/svelte-authkit/modules#verifytoken)

## Variables

### isAuthenticated

• `Const` **isAuthenticated**: `Writable`\<`boolean`\>

#### Defined in

[src/lib/stores/userStore.js:4](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/stores/userStore.js#L4)

___

### user

• `Const` **user**: `Writable`\<``null``\>

#### Defined in

[src/lib/stores/userStore.js:3](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/stores/userStore.js#L3)

## Functions

### AuthkitCallback

▸ **AuthkitCallback**(`params`): `Promise`\<`Response`\>

Asynchronous function that handles the callback from the WorkOS authentication process and returns to the homepage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | An object containing the necessary parameters to handle the callback. |
| `params.secret` | `Uint8Array` | The secret used to sign the JWT. |
| `params.url` | `URL` | The URL containing the code parameter. |
| `params.workOSClientId` | `string` | The WorkOS client ID. |
| `params.workos` | `WorkOS` | The instance of the WorkOS object. |

#### Returns

`Promise`\<`Response`\>

A new instance of the Response object. This response contains a 302 status and the root URL ("/") in the "Location" header.

**`Example`**

```ts
const response = await AuthkitCallback({
    workOSClientId: 'env_workos_client_id',
    workos: workos_instance,
    secret: secret,
    url: callback_url
});
```

#### Defined in

[src/lib/utils/server/hooks.ts:65](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/server/hooks.ts#L65)

___

### AuthkitSignIn

▸ **AuthkitSignIn**(`params`): `Promise`\<`Response`\>

Asynchronous function that generates an authorization URL and Response for a WorkOS client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | An object containing the necessary parameters to generate the authorization URL. |
| `params.workOSClientId` | `string` | The WorkOS client ID. |
| `params.workOSRedirectURI` | `string` | The redirect URI after successful authentication. |
| `params.workos` | `WorkOS` | The instance of the WorkOS object. |

#### Returns

`Promise`\<`Response`\>

A new instance of the Response object. This response contains a 200 status and the authorization URL in the "Location" header.

**`Example`**

```ts
const response = await AuthkitSignIn({
    workOSClientId: 'your_workos_client_id',
    workOSRedirectURI: 'your_redirect_uri',
    workos: your_workos_instance
});
```

#### Defined in

[src/lib/utils/server/hooks.ts:23](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/server/hooks.ts#L23)

___

### AuthkitSignOut

▸ **AuthkitSignOut**(): `Promise`\<`Response`\>

Asynchronous function that handles the sign out process from the WorkOS authentication.

#### Returns

`Promise`\<`Response`\>

A new instance of the Response object. This response contains a 302 status and the root URL ("/") in the "Location" header, indicating a successful sign out.

**`Example`**

```ts
const response = await AuthkitSignOut();
```

#### Defined in

[src/lib/utils/server/hooks.ts:185](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/server/hooks.ts#L185)

___

### AuthkitVerifyToken

▸ **AuthkitVerifyToken**(`params`): `Promise`\<`Response`\>

Asynchronous function that verifies the stored token containing user inforomations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | An object containing the necessary parameters to verify the token. |
| `params.event` | `RequestEvent`\<`Partial`\<`Record`\<`string`, `string`\>\>, ``null`` \| `string`\> | The RequestEvent containing the token. |
| `params.secret` | `Uint8Array` | The instance of the WorkOS object. |

#### Returns

`Promise`\<`Response`\>

A new instance of the Response object. This response contains the verification status and the decoded token if the user is logged in, otherwise it will return isAuthenticated with a false value.

**`Example`**

```ts
const response = await AuthkitVerifyToken({
    event: event,
    secret: secret
});
```

#### Defined in

[src/lib/utils/server/hooks.ts:125](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/server/hooks.ts#L125)

___

### initWorkOS

▸ **initWorkOS**(`WORKOS_API_KEY`): `WorkOS`

Returns a new instance of the WorkOS object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `WORKOS_API_KEY` | `string` |

#### Returns

`WorkOS`

A new instance of the WorkOS object.

**`Example`**

```ts
const workos = initWorkOS('env_workos_api_key');
```

#### Defined in

[src/lib/utils/server/workos.ts:12](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/server/workos.ts#L12)

___

### signIn

▸ **signIn**(): `Promise`\<`void`\>

Asynchronous function that initiates the sign in process.

This function sends a GET request to the '/auth' endpoint and redirects the user to the location specified in the response headers.

#### Returns

`Promise`\<`void`\>

**`Example`**

```ts
await signIn();
```

#### Defined in

[src/lib/utils/client/auth.ts:11](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/client/auth.ts#L11)

___

### signOut

▸ **signOut**(): `Promise`\<`void`\>

Asynchronous function that initiates the sign out process.

This function sends a POST request to the '/auth/sign-out' endpoint and redirects the user to the homepage upon successful sign out.

#### Returns

`Promise`\<`void`\>

**`Example`**

```ts
await signOut();
```

#### Defined in

[src/lib/utils/client/auth.ts:26](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/client/auth.ts#L26)

___

### verifyToken

▸ **verifyToken**(): `Promise`\<``null``\>

Asynchronous function that verifies the user's token.

This function sends a POST request to the '/auth/verify-token' endpoint. If the response is OK, it updates the `isAuthenticated` and
`user` stores with the data received from the response. If the response is not OK, it logs an error message with the response status.
If an error occurs during the fetch operation, it logs an error message with the error.

#### Returns

`Promise`\<``null``\>

**`Example`**

```ts
await verifyToken();
```

#### Defined in

[src/lib/utils/client/auth.ts:43](https://github.com/dasporal/svelte-authkit/blob/88b9855/src/lib/utils/client/auth.ts#L43)
