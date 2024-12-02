# 路由

## 概述

路由采用配置式的 `history` 路由。所有路由相关代码都在 `src/router/` 、`src/main.tsx` 和 `src/App.tsx` 中

- 配置路由后，会自动生成`react路由`、`菜单`、`面包屑`等相关数据
- 打包后，会根据路由生成独立js文件，并动态加载

## 路由配置

**路由配置**在 `src/router/config/index.tsx` 文件的 `routesConfig` 中

```ts
// 配置示例
export const routesConfig: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/pages/login'),
    name: '登录',
    hidden: true,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('@/layouts/ConsoleLayout'),
    flatten: true,
    children: [
      {
        path: 'home',
        name: '首页',
        permission: 'home',
        icon: <SvgIcon name="home" />,
        children: [
          {
            path: '',
            redirect: 'index',
          },
          {
            path: 'index',
            component: () => import('@/pages/home'),
            name: '首页',
            permission: 'homeIndex',
            icon: <SvgIcon name="home" />,
          },
          {
            path: 'grid',
            component: () => import('@/pages/grid'),
            name: '栅格布局',
            permission: 'homeGrid',
            icon: <SvgIcon name="grid" />,
          },
        ],
      },
      {
        external: true,
        path: 'https://github.com/diandian18/react-antd-console',
        name: '外链',
        icon: <SvgIcon name="external_link" />,
        permission: 'external',
      },
    ],
  },
  {
    path: '/no-access',
    component: () => import('@/pages/noAccess'),
    name: '出错了',
    hidden: true,
  },
  {
    path: '/not-found',
    component: () => import('@/pages/notFound'),
    name: '页面不存在',
    hidden: true,
  },
  {
    path: '*',
    component: () => import('@/pages/notFound'),
    name: '页面不存在',
    hidden: true,
  },
];
```

## 路由数据

根据**路由配置** `routesConfig`，利用 `react-router-toolset` 的类 `Router`，生成了 `reactRoutes`、`routes`、`flattenRoutes` 等数据

```ts
import { Router } from 'react-router-toolset';
import { routesConfig } from '@/router/config';
// router 对象包含了 reactRoutes、routes、flattenRoutes
const router = new Router(routesConfig);
```

| 数据          |      类型       |   来源   | 作用                                           |
| ------------- | :-------------: | :------: | :--------------------------------------------- |
| routesConfig  |  `RouteConfig`  | 手动配置 | 配置路由                                       |
| reactRoutes   | [`RouteObject[]`](https://reactrouter.com/en/main/route/route#type-declaration) | 自动生成 | 用于生成 `react-router` 路由                   |
| routes        | `RouteConfig[]` | 自动生成 | 树型结构，用于生成 **菜单**、**面包屑** 等数据 |
| flattenRoutes | `RouteConfig[]` | 自动生成 | `routes` 的展平数据结构，方便查询路由          |

## `RouteConfig`类型

```typescript
interface RouteConfig {
    /** 配置数据: 路径，同react-router */
    path: string;
    /** 生成数据: 对应react-router的pathname */
    pathname?: string;
    /**
     * 生成数据: ['', '/layout', '/layout/layout-children1',
     *  '/layout/layout-children1/permission']
     */
    collecttedPathname?: string[];
    /** 生成数据: ['', 'layout', 'layout-children1', 'permission'] */
    collecttedPath?: string[];
    /** 配置数据: 组件的文件地址 */
    component?: () => Promise<any>;
    /** 配置数据: 隐藏在菜单 */
    hidden?: boolean;
    /** 配置数据: 菜单名称 */
    name?: string;
    /** 配置数据: 菜单icon */
    icon?: React.ReactNode;
    /** 配置数据: 页面标题，不传则用name */
    helmet?: string;
    /** 配置数据: 菜单权限 */
    permission?: string;
    /** 配置数据: 重定向path */
    redirect?: string;
    /** 配置数据: 将子路由的菜单层级提升到本级 */
    flatten?: boolean;
    /** 配置数据: 子路由，同react-router */
    children?: RouteConfig[];
    /** 配置数据: 同react-router */
    caseSensitive?: boolean;
    /** 配置数据: 是否是外链 */
    external?: boolean;
    /** 生成数据: 父路由 */
    parent?: RouteConfig;
};
```

::: tip
**“生成数据”**是根据**“配置数据”** 自动生成的
:::

## 其他路由工具

`react-router-toolset` 工具的其他重要导出

- `HistoryRouter` 组件，用于作为 `react-router` 的 `<Provider />`
- `history` 方法，可在 react 组件外跳转路由

## 入口使用

::: code-group

```tsx [src/main.tsx]
import { history, HistoryRouter } from '@/router';

createRoot(document.getElementById('root')!).render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>,
);
```

```tsx [src/App.tsx]
import { useRoutes } from 'react-router-dom';
import router, { useRouter } from '@/router';

function App() {
  const element = useRoutes(router.reactRoutes);
  return element;
}

export default App;
```
