# 项目结构

## UI结构

由一个固定的[通用布局](./layout#布局)(对应目录为 `src/layouts/`)和各[路由配置](./route#路由)的**页面**(对应目录为`src/pages/`)组成

<script setup>
import Structure from '../components/Structure.vue';
</script>

<Structure />

## 目录结构

```shell
./src
├── assets      # 公共静态资源
├── components  # 公共组件
├── consts      # 公共常量
├── hooks       # 公共hooks
├── http        # http
├── layouts     # 通用布局
├── locales     # 多语言配置
├── mock        # mock
├── models      # 公共数据管理
├── pages       # 页面组件
├── router      # 路由配置
├── services    # 接口配置
├── styles      # 公共样式
├── utils       # 公共工具
├── App.tsx     # 根组件
└── main.tsx    # 入口组件
```

下面从:

- 固定目录(不需要修改)
- 配置目录
- 公共目录

三种目录概述

### 固定目录

- `src/lyaouts`: 通用布局。封装好的，一般不需要改（当然也可以根据自己的需求自行改造）
- `src/http`: 封装了 `axios`，配置了请求和响应拦截，导出了 `axios` 实例
- `src/mock`: 封装了 `msw`，若要添加mock文件，请在 `src/mock/browser.ts` 中添加

### 配置目录

- `src/router`: 包含路由配置和导出了一些重要的路由方法
- `src/pages`: 业务页面
- `src/locales`: 多语言配置
- `src/services`: 接口配置

### 公共目录

以下目录，定义为通用目录，存放的都是可以复用的代码

- `src/assets`: 公共静态资源
- `src/components`: 公共组件
- `src/consts`: 公共常量
- `src/hooks`: 公共hooks
- `src/models`: 公共数据管理
- `src/styles`: 公共样式
- `src/utils`: 公共工具

::: tip
逻辑相关性强的文件之间，应当尽可能的靠近，最好放在同一目录下。而公共目录，应当只包含：**全局**或**可复用**的代码
:::

::: tip
特别需要注意的是，除非由特殊原因，我们不认为每个**页面**组件都需要对应一个**model**数据，因为这么做会增加结构复杂度和维护难度。**model**中的数据，应该是一些**全局**或**可复用**的数据
:::
