# 布局

项目封装了统一的布局，所有的布局相关代码都在 `src/layouts/ConsoleLayout/` 中。主要包含了**侧边菜单 `<SideMenu />`**、**面包屑 `<Breadcrumb />`**、**头 `<Header />`**、**脚 `<Footer />`** 等。路由页面体现在 [**`<Outlet />`**](https://reactrouter.com/en/main/components/outlet) 中

<script setup>
import Layout from '../components/Layout.vue';
</script>

<Layout />

::: code-group

```tsx [src/layouts/ConsoleLayout/index.tsx]
import { Outlet } from 'react-router';

const ConsoleLayout = () => {
  return (
    <div className="console-layout">
      <div className="console-layout__left-side">
        <SideMenu />
      </div>
      <div className="console-layout__right-side">
        <Header />
        <div className="console-layout__right-side-main">
          {refreshing ? null : <Outlet />}
        </div>
        <Footer />
      </div>
    </div>
  );
};
```

:::

::: tip
**ConsoleLayout** 是全局的，一般不需要更改，当然也可根据自己的需求修改或新增自定义布局
:::

::: tip
**ConsoleLayout** 是完全可以被替换的，你完全可以自定义自己的 layout。但自定义的 layout，需要用 [withAuth](./auth) 高阶组件包裹，以达到鉴权效果
:::

::: tip
页面路由变化时，**侧边菜单**、**面包屑**、**标签页**等会自动匹配当前路由并作出对应的变化，所以只需要专注于业务页面开发
:::
