# create-spearjs

用于创建 spearjs 低代码平台的 widget 项目 脚手架 。

## Usage

With NPM

```sh
npm create spearjs
```

With Yarn

```sh
yarn create spearjs
```

With PNPM

```sh
pnpm create spearjs
```

然后跟随提示进行操作即可。

你也可以在终端中使用命令行参数指定 目录、widget 类型，是否使用 Typescript。

**示例：**

```sh
# npm 6.x
npm create spearjs my-widget -c -t
npm create spearjs my-widget -c

# npm 7+
npm create spearjs my-widget -- -c

# yarn
yarn create spearjs my-widget -c

# pnpm
pnpm create spearjs my-widget -c
```

## Commands

```sh
npm create spearjs [targetDir] [options]

```

**targetDir:**

指定 widget 目录

使用 `.` 指定为在当前目录。

**options:**

- `-c,--component`: 指定 widget 类型为 component
- `-s,--service`: 指定 widget 类型为 service
- `-t,--typescript`: 是否使用 Typescript

## 说明

**强烈建议使用 typescript 来开发 widget。**

我们为 项目提供了非常丰富的类型检查，使用 typescript 进行开发能够获得更好的开发体验！
