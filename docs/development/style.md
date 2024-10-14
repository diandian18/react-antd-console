# 样式

样式方案采用 [less](https://lesscss.org/) ，并遵循 [BEM](https://getbem.com/) 规范。

:::tip
你可以根据需要，自行采用其他样式方案，如 [tailwindcss](https://tailwindcss.com/)、[styled-components](https://styled-components.com/) 等。
:::

## 目录结构

```shell
├── src
│   ├── styles          # 全局样式
│   │   ├── index.less  # 入口文件
│   │   ├── reset.less  # 重置样式
│   │   ├── utils.less  # 工具样式
│   │   └── vars.less   # less样式变量
│   ├── pages
│   │   ├── login
│   │   │   ├── index.less
│   │   │   └── index.tsx
```

::: tip
对于业务组件，建议把**样式文件**和**组件文件**放在一起
:::
