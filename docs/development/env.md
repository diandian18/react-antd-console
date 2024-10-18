# 环境变量

环境变量采用 `vite` 内置的方案。

- 当使用 `vite --mode localhost` 启动项目时，环境的配置文件，对应的是根目录的 `.env.localhost` 文件。
- `.env.localhost` 文件中定义的环境变量，可通过 `const { VITE_API_HOST } = import.meta.env` 在代码中引入。

## 如何新增环境，并新增环境变量

1. 在根目录新建 `.env.newEnv` 文件
2. 在 `.env.newEnv` 文件中定义环境变量: `VITE_SOME_KEY = someValue`
3. 在 `src/vite-env.d.ts` 定义 `VITE_SOME_KEY` 的类型
4. 在项目的 `ts/tsx` 文件中引入环境变量 `const { VITE_SOME_KEY } = import.meta.env;`

## 使用环境构建

添加构建命令:

::: code-group

```json [package.json]
{
  "scripts": {
    "build:newEnv": "vite build --mode newEnv",  // [!code ++]
  }
}
```

:::

执行构建

```shell
npm run build:newEnv
```
