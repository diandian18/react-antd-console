# Icon

项目利用了 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) 封装了 `SvgIcon` 组件，可以像引入图片资源一样，方便地引入图标资源。

## 定义

```ts
interface SvgIconProps<T> extends SVGAttributes<T> {
  className?: string;
  style?: CSSProperties;
  prefix?: string;
  /** [dir]-[filename] */
  name: string;
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}
```

## 使用

```tsx
import SvgIcon from '@/components/SvgIcon';

const MyComponent = () => {
  return (
    // 通过name属性找到svg文件
    <SvgIcon name="refresh" size={18} color="#eee" />;
  );
}
```

## `svg` 大小

默认 `svg` 大小为 `16px`。可通过两种方式设置：

- `size`: 宽高值相等，优先级大于 `width` 和 `height` 属性
- `width/height` 属性

## `name` 属性是怎么找到 `svg` 文件位置的？

- `vite-plugin-svg-icons` 通过我们定义的 `symbolId` 找到 `svg` 文件
- `SvgIcon` 的 `name` 属性代表 `assets/svg/` 目录下的 `svg` 文件。格式为：
  - 如果在 `assets/svg/` 下的根目录，则为 `[filename]`
  - 如果在 `assets/svg/` 下的子目录，则为 `[dir]-[filename]`
