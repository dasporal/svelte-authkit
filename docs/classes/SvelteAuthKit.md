[@dasporal/svelte-authkit](../README.md) / [Exports](../modules.md) / SvelteAuthKit

# Class: SvelteAuthKit\<Props, Events, Slots\>

Base class for Svelte components with some minor dev-enhancements. Used when dev=true.

Can be used to create strongly typed Svelte components.

#### Example:

You have component library on npm called `component-library`, from which
you export a component called `MyComponent`. For Svelte+TypeScript users,
you want to provide typings. Therefore you create a `index.d.ts`:
```ts
import { SvelteComponent } from "svelte";
export class MyComponent extends SvelteComponent<{foo: string}> {}
```
Typing this makes it possible for IDEs like VS Code with the Svelte extension
to provide intellisense and to use the component like this in a Svelte file
with TypeScript:
```svelte
<script lang="ts">
	import { MyComponent } from "component-library";
</script>
<MyComponent foo={'bar'} />
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `Props` | extends `Record`\<`string`, `any`\> = `any` |
| `Events` | extends `Record`\<`string`, `any`\> = `any` |
| `Slots` | extends `Record`\<`string`, `any`\> = `any` |

## Hierarchy

- `SvelteComponent_1`\<`Props`, `Events`\>

  ↳ **`SvelteAuthKit`**

## Indexable

▪ [prop: `string`]: `any`

## Table of contents

### Constructors

- [constructor](SvelteAuthKit.md#constructor)

### Properties

- [$$](SvelteAuthKit.md#$$)
- [$$events\_def](SvelteAuthKit.md#$$events_def)
- [$$prop\_def](SvelteAuthKit.md#$$prop_def)
- [$$set](SvelteAuthKit.md#$$set)
- [$$slot\_def](SvelteAuthKit.md#$$slot_def)

### Methods

- [$capture\_state](SvelteAuthKit.md#$capture_state)
- [$destroy](SvelteAuthKit.md#$destroy)
- [$inject\_state](SvelteAuthKit.md#$inject_state)
- [$on](SvelteAuthKit.md#$on)
- [$set](SvelteAuthKit.md#$set)

## Constructors

### constructor

• **new SvelteAuthKit**\<`Props`, `Events`, `Slots`\>(`options`): [`SvelteAuthKit`](SvelteAuthKit.md)\<`Props`, `Events`, `Slots`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Props` | extends `Record`\<`string`, `any`\> = `any` |
| `Events` | extends `Record`\<`string`, `any`\> = `any` |
| `Slots` | extends `Record`\<`string`, `any`\> = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ComponentConstructorOptions`\<`Props`\> |

#### Returns

[`SvelteAuthKit`](SvelteAuthKit.md)\<`Props`, `Events`, `Slots`\>

#### Overrides

SvelteComponent\_1\&lt;Props, Events\&gt;.constructor

#### Defined in

node_modules/svelte/types/index.d.ts:144

## Properties

### $$

• **$$**: `any`

### PRIVATE API

Do not use, may change at any time

#### Inherited from

SvelteComponent\_1.$$

#### Defined in

node_modules/svelte/types/index.d.ts:102

___

### $$events\_def

• **$$events\_def**: `Events`

For type checking capabilities only.
Does not exist at runtime.
### DO NOT USE!

#### Defined in

node_modules/svelte/types/index.d.ts:158

___

### $$prop\_def

• **$$prop\_def**: `Props`

For type checking capabilities only.
Does not exist at runtime.
### DO NOT USE!

#### Defined in

node_modules/svelte/types/index.d.ts:151

___

### $$set

• **$$set**: `any`

### PRIVATE API

Do not use, may change at any time

#### Inherited from

SvelteComponent\_1.$$set

#### Defined in

node_modules/svelte/types/index.d.ts:109

___

### $$slot\_def

• **$$slot\_def**: `Slots`

For type checking capabilities only.
Does not exist at runtime.
### DO NOT USE!

#### Defined in

node_modules/svelte/types/index.d.ts:165

## Methods

### $capture\_state

▸ **$capture_state**(): `void`

#### Returns

`void`

#### Defined in

node_modules/svelte/types/index.d.ts:167

___

### $destroy

▸ **$destroy**(): `void`

#### Returns

`void`

#### Inherited from

SvelteComponent\_1.$destroy

#### Defined in

node_modules/svelte/types/index.d.ts:111

___

### $inject\_state

▸ **$inject_state**(): `void`

#### Returns

`void`

#### Defined in

node_modules/svelte/types/index.d.ts:169

___

### $on

▸ **$on**\<`K`\>(`type`, `callback`): () => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `callback` | `undefined` \| ``null`` \| (`e`: `Events`[`K`]) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Inherited from

SvelteComponent\_1.$on

#### Defined in

node_modules/svelte/types/index.d.ts:113

___

### $set

▸ **$set**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`\<`Props`\> |

#### Returns

`void`

#### Inherited from

SvelteComponent\_1.$set

#### Defined in

node_modules/svelte/types/index.d.ts:115
