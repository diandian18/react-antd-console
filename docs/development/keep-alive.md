# KeepAlive

`keepAlive` 功能，类似 `vue` 的 `KeepAlive` 功能，用于在组件间进行切换时，缓存被移除的组件实例

## 启用

使用 `KeepAlive` 能力需要安装 `react` 和 `react-dom` 的 `experimental` 版本:

```shell
npm i react@experimental react-dom@experimental -S --legacy-peer-deps
```

在 `ConsoleLayout` 组件中引入并使用 `KeepAliveOutlet` 代替 `react-router` 的 `Outlet`:

::: code-group

```tsx [src/layouts/ConsoleLayout/index.tsx]
import { Outlet } from 'react-router'; // [!code --]
import KeepAliveOutlet from '@/components/KeepAliveOutlet'; // [!code ++]
import { motion } from 'framer-motion'; // [!code --]
import { Animations } from './animations'; // [!code --]

return (
  <div>
    <div className="console-layout__right-side">
      {/* [!code --] */}
      <div className="console-layout__right-side-main-wrap"> 
        {refreshing ? null : ( // [!code --]
          <motion.div // [!code --]
            className={ClassName__ConsoleLayout_RightSideMain} // [!code --]
            key={location.pathname} // [!code --]
            variants={Animations['fadeIn']} // [!code --]
            initial="initial" // [!code --]
            animate="in" // [!code --]
            transition={{ type: 'tween', duration: 0.15, ease: 'easeIn' }} // [!code --]
          {/* [!code --] */}
          >
            {/* [!code --] */}
            <Outlet />
          </motion.div> // [!code --]
        {/* [!code --] */}
        )}
      {/* [!code --] */}
      </div>
      {/* [!code ++] */}
      <div className={`console-layout__right-side-main-wrap ${ClassName__ConsoleLayout_RightSideMain}`}>
        {/* [!code ++] */}
        {refreshing ? null : <KeepAliveOutlet />}
      {/* [!code ++] */}
      </div>
    </div>
  </div>
);
```

:::

## 查看效果

在 [示例页](https://template.react-antd-console.site/home/alive) 输入框输入一个数字，切换到其他页面，再切换回来，看看数字是否仍然在
