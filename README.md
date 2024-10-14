<p align="center">
  <img width="320" src="https://console.zhangsai.online/static/logo-name.png">
</p>

[Preview](https://console.zhangsai.online) | [Documentation](https://doc.zhangsai.online)

## 后台管理系统的前端解决方案

<p align="center">
  <img width="100%" src="https://console.zhangsai.online/static/home.png">
</p>

## 介绍

react-antd-console 是一个后台管理系统的前端解决方案，封装了后台管理系统必要功能（如登录、鉴权、菜单、面包屑、标签页等），帮助开发人员专注于业务快速开发。项目基于 React18、Ant design5、Vite 和 Typescript 等新版本。对于使用到的各项技术，会被持续更新至最新版本

## 谁适合使用？

如果你将要开发或学习如何开发后台管理系统。并且你是一名新手前端开发者，或者是一名了解一些前端的后端开发者，或者是一名有一定经验的前端开发者，但当下还没有信心把握所有的事情，并且希望循序渐进掌握，那么可以尝试本项目

## 尽可能简单

无论是使用本项目做开发，还是学习的目的，保持简单是必要的。因此本项目专注于：良好的代码层次设计、定义清晰明确的目录结构、容易改造和拆换的模块分类等。本项目最小化的封装了一些必要的功能，例如登录、鉴权、菜单、面包屑、标签页等。如果你没有自己的UI设计，那么可以直接使用本项目封装的功能；如果你有自己的UI设计，那么也可以在本项目基础上作方便的改造

## 功能

- **最新技术栈**: `Vite`(支持`热更新`)、`React18`、`Ant Design5`、`Typescript`(近乎`100%`的类型覆盖)。
- **专注业务**: 封装好的布局(侧边菜单、面包屑、标签页、页头页脚等)，只需要`专注于业务开发`。
- **权限管理**: 支持`菜单级`和`按钮级`权限。（Pro edition）
- **路由配置**: 一份配置，自动生成路由、菜单、面包屑等，支持嵌套路由、单/无布局等配置，支持路由动态变化等。
- **数据管理**: `分层`（数据和视图）架构设计，数据管理方案理论上支持接入任意UI渲染库/框架（包括不限于React/Vue/Angular）
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

<style>
.img-row {
  display: flex;
  width: 100%;
}
.img-wrap {
    width: 50%;
    padding: 20px;
  }
</style>

### 深/浅色主题

<div class="img-row" align="center">
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/home.png"></div>
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/dark.png"></div>
</div>

### 任意主色切换

<div class="img-row">
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/color-blue.png"></div>
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/color-green.png"></div>
</div>

<div class="img-row">
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/color-oringe.png"></div>
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/color-purple.png"></div>
</div>

### 任意背景色切换

<div class="img-row">
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/bg-color-light.png"></div>
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/bg-color-dark.png"></div>
</div>

### 4种布局

<div class="img-row">
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/home.png"></div>
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/sider-single.png"></div>
</div>

<div class="img-row">
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/header-sider.png"></div>
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/header-single.png"></div>
</div>

### 丰富的主题配置

<div class="img-row">
  <div class="img-wrap"><img src="https://console.zhangsai.online/static/theme-config.png"></div>
</div>
