# `@spearjs/cli`

`SpearJs` 低代码开发平台， `widget` 开发 cli。

提供 开发环境、打包构建，发布到 `SpearJs` 平台的服务。

## Install

```sh
# npm
npm install --save-dev @spearjs/cli
# yarn
yarn add --save-dev @spearjs/cli
# pnpm
pnpm add --save-dev @spearjs/cli
```

## Usage

```json
{
  "scripts": {
    "dev": "spearjs dev",
    "build": "spearjs build",
    "publish": "spearjs publish"
  }
}
```

## Configuration

`widget.config.ts`

```ts
import { defineConfig } from '@spearjs/cli'

export default defineConfig({
  // ...config
})
```

## Create Widget Project

See `@spearjs/create-app`
