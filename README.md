<p align="center">
  <img width="320" src="https://static.react-antd-console.site/logo-name.png">
</p>

# 后台管理系统的前端解决方案

[在线预览](https://template.react-antd-console.site) | [拓展pro版在线预览](https://react-antd-console.site) | [文档](https://doc.react-antd-console.site)

<p align="center">
  <img width="100%" src="https://static.react-antd-console.site/template.png?b=1">
</p>

## 介绍

react-antd-console 是一个后台管理系统的前端解决方案，封装了后台管理系统必要功能（如登录、鉴权、菜单、面包屑等），帮助开发人员专注于业务快速开发。项目基于 `React 18`、`Ant design 5`、`Vite` 和 `TypeScript` 等新版本。对于使用到的各项技术，会被持续更新至最新版本

## 谁适合使用？

如果你将要开发或学习如何开发后台管理系统。并且你是一名新手前端开发者，或者是一名了解一些前端的后端开发者，或者是一名有一定经验的前端开发者，但当下还没有信心把握所有的事情，并且希望循序渐进掌握，那么可以尝试本项目。本项目是作者多年经验的总结，可放心用于生产环境

## 尽可能简单

无论是使用本项目做开发，还是学习的目的，保持简单是必要的。因此本项目专注于：良好的代码层次设计、定义清晰明确的目录结构、容易改造和拆换的模块分类等。本项目最小化的封装了一些必要的功能，例如登录、鉴权、菜单、面包屑等。如果你没有自己的UI设计，那么可以直接使用本项目封装的功能；如果你有自己的UI设计，那么也可以在本项目基础上作方便的改造

## 功能

- **最新技术栈**: `Vite`(支持`热更新`)、`React18`、`Ant Design5`、`TypeScript`(近乎`100%`的类型覆盖)。
- **专注业务**: 封装好的布局(侧边菜单、面包屑、页头页脚等)，只需要`专注于业务开发`。
- **权限管理**: 支持`菜单级`和`按钮级`权限。
- **路由配置**: 一份配置，自动生成路由、菜单、面包屑等，支持嵌套路由、单/无布局等配置，支持路由动态变化等。
- **数据管理**: `分层`（数据和视图）架构设计，数据管理方案理论上支持接入任意UI渲染库/框架（包括不限于React/Vue/Angular）。
- **颜色换肤**: 支持深/浅肤色模式下的任意颜色切换。（Pro edition）
- **风格主题**: 不同的主题风格选择，如`布局`、`菜单`、`标签页`、`面包屑`、`页头页脚`、`动画`等。（Pro edition）
- **丰富组件**: 如`搜索表格`、`引导`、`富文本`、`Markdown`等。（Pro edition）
- **其他功能**: 如`响应式设计`、`国际化`、`Mock`、`环境配置`、`工程化规范`等。

## 快速开始

```shell
# 安装依赖
npm i

# 启动服务
npm start
```

浏览器访问 <a href="http://localhost:9527" target="_blank">http://localhost:9527</a>

## 构建

```shell
# 构建生产环境包
npm run build:prod
```

## 浏览器兼容

兼容支持es2015的浏览器，不兼容IE，建议不低于:

- Chrome >=87
- Firefox >=78
- Safari >=14
- Edge >=88

## Pro edition

本项目作为基础模板，是通用的。且为了方便大家拓展出不同主题和样式，所写样式极少。下面是根据本项目模板拓展出来的拓展pro版本（未完待续），如果你认为哪些功能是通用的，有必要放进模板中，可以提出意见和建议，我们根据实际情况考虑放进去

当然，你也可以在本项目基础上，作出符合自己喜好的主题和样式

[拓展pro版在线预览](https://react-antd-console.site)

### 深/浅色主题

| <img src="https://static.react-antd-console.site/home.png"> | <img src="https://static.react-antd-console.site/dark.png"> |
| --- | --- |
| Light | Dark |

### 任意主色切换

| <img src="https://static.react-antd-console.site/color-blue.png"> | <img src="https://static.react-antd-console.site/color-green.png"> |
| --- | --- |

| <img src="https://static.react-antd-console.site/color-oringe.png"> | <img src="https://static.react-antd-console.site/color-purple.png"> |
| --- | --- |

### 任意背景色切换

| <img src="https://static.react-antd-console.site/bg-color-light.png"> | <img src="https://static.react-antd-console.site/bg-color-dark.png"> |
| --- | --- |
| Background Light | Background Dark |

### 4种布局

| <img src="https://static.react-antd-console.site/home.png"> | <img src="https://static.react-antd-console.site/sider-single.png"> |
| --- | --- |
| 侧分栏 | 侧单栏 |

| <img src="https://static.react-antd-console.site/header-sider.png"> | <img src="https://static.react-antd-console.site/header-single.png"> |
| --- | --- |
| 头分栏 | 头单栏 |

### 丰富的主题配置

<img width="100%" src="https://static.react-antd-console.site/theme-config.png">

[在线预览](https://template.react-antd-console.site) | [拓展pro版在线预览](https://react-antd-console.site) | [文档](https://doc.react-antd-console.site)
