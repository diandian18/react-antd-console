# 编码规范

## 概述

项目总体按最小约束原则约束编码规范，只使用了 `eslint`。你可以根据自己的需求自行添加各规范，如 [stylelint](https://stylelint.io/)、[prettier](https://prettier.io/)等

:::tip
我们认为在编码规范方面，应当在工程**统一性**和**灵活性**之间找到一个平衡，而不是一味地使用各种lint类工具作强制约束。你可以找到自己团队的平衡点，定制适合自己团队的编码规范
:::

## eslint规则

本项目采用官方建议的通用 `eslint` 规则，如下:

- `@typescript-eslint/recommended` （`eslint` 官方赞助的社区 `typescript` 规则）
- `eslint:recommended` （`eslint` 官方推荐规则）
- `eslint-plugin-react` （社区流行的 `react` 规则）

详见 `.eslintrc.cjs`
