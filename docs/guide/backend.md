# 我是后端？

如果你是前端开发，并了解 [Node.js](https://nodejs.org/zh-cn) 和 [npm](https://www.npmjs.com/) 的基本知识，则可以跳过本节。如果你是没有前端经验的后端，可以按照下面说明，准备开发环境并作一些基础知识学习

## 安装 Node.js

可以使用 [nvm](https://github.com/nvm-sh/nvm) 工具，下载安装和管理node

下载 nvm 以后，安装 Node.js

```shell
# 安装 lts 版本
nvm install --lts
```

切换当前 node 版本为 lts 版本

```shell
nvm use --lts
```

确认 node 和 npm 被正确安装

```shell
node -v
npm -v
```

## 使用 npm 镜像加速

npm 官方仓库的包，可能因为网络问题下载不了，可以使用 [nrm](https://github.com/Pana/nrm) 工具，切换镜像源以加速

查看有哪些源

```shell
nrm ls
```

切换到淘宝镜像

```shell
nrm use taobao
```

npm 的 [package.json 官方文档](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)

## TypeScript

[TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)

## React

[React 官方文档](https://zh-hans.react.dev/learn)

## React Router

[React Router 官方文档](https://reactrouter.com/en/main)

## Ant Design

[Ant Design 官方文档](https://ant.design/components/overview-cn)
