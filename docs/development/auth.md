# 鉴权

## 基本原理

鉴权是指，对**已登陆状态**和**当前路由访问权限**的验证。相关逻辑封装在一个高阶组件 `withAuth` 里，该组件将 `<ConsoleLayout />` 组件包裹。因此 `<ConsoleLayout />` 下的路由，每次切换时，都会执行鉴权逻辑。具体表现为：

```mermaid
flowchart TD
  A([每次路由切换]) --> B{有本地token？}
  B -->|No| C(跳转登录页) --> Z(登录至主页) --> A
  B -->|Yes| D{已请求基础数据？}
  D -->|No| E(请求基础数据) --> F
  D -->|Yes| F{有权访问当前路由？}
  F --> |No| G([跳转403页])
  F --> |Yes| H([渲染路由 Outlet])
```

- 每次路由切换，都会检查是否有本地token？
  - 若无本地token，则跳转登录页；
  - 若有本地token，则检查是否已请求基础数据？
    - 若未请求基础数据，则请求之；
    - 若已请求基础数据，则根据基础数据检查是否具备当前路由的访问权限？
      - 若无权限，则去 **403** 页。
      - 若有权限，则渲染路由 `<Outlet />`。

以上逻辑封装为 `withAuth` 高阶组件，在 `src/components/business/withAuth/index.tsx` 文件中

`ConsoleLayout` 组件被 `withAuth` 高阶组件包裹

::: code-group

```tsx [src/layouts/ConsoleLayout/index.tsx]
const ConsoleLayout = withAuth(() => {
  return <div>ConsoleLayout</div>;
});

export default ConsoleLayout;
```

:::

:::info
也可以编写自定义的 `CustomLayout` 布局组件，然后用 `withAuth` 高阶组件包裹，以达到鉴权效果
:::

## 如何配置路由权限？

路由只有配置了权限code，这样才能通过请求的基础数据来验证当前帐号是否具备当前路由访问权限。以下介绍如何配置

::: code-group

```tsx [services/login.mock.ts]
// 在 mock 的 userAdmin 或 userAssistant 中定义后端权限
export const userAdmin = {
  'permissions': [
    'home', // [!code ++]
  ],
};
```

```tsx [models/withAuth/permissions.ts]
// 在 formatPermissions 中定义前端权限
function formatPermissions(permissions: string[]) {
  const set = new Set(permissions);
  return {
    // key为需要绑定到routerConfig上的权限名称
    // value为后端定义的权限名称
    home: set.has('home'), // [!code ++]
  },
}
```

```tsx [router/config/index.tsx]
// 在路由配置中绑定权限
export const routesConfig: RouteConfig[] = [
  {
    path: 'home',
    name: '首页',
    permission: 'home', // [!code ++]
    icon: <SvgIcon name="home" />,
  },
];
```

:::
