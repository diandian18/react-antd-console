# 数据管理

## 概述

一般来讲，后台管理系统的各个页面之间的数据是相互隔离的，因此没有必要给每个**页面**组件都写一个对应的**model**数据。各页面的数据，应当就近放在页面组件附近。我们认为只有一些**全局**或**可复用**的数据，需要被抽离在 `src/models/` 中。

例如，表示语言的全局变量 `language`、表示当前用户所拥有的权限的全局变量 `permissions` 等。

项目利用了 `@zhangsai/model` 作为数据管理方案。

## 定义

```ts
import { Model, INITIAL_STATE, Persist, persist } from '@zhangsai/model';

// 定义初始化数据
export class InitialState extends INITIAL_STATE {
  // 该字段将被持久化进 localstorage, 键值对为: persist_language -> "zh_Hans"
  @persist
  /** 语言 */
  language: string = 'zh_Hans';
}
const initialState = new InitialState();

// 定义model类
@Persist()
class BaseModel extends Model<InitialState> {
  constructor(initialState: InitialState) {
    super(initialState);
  }

  public async init() {}
  public destroy() {}

  setLanguage = (language: string) => {
    // 成员方法 setState 用以更新数据，并保持了数据不可变原则
    this.setState({ language });
    i18n.changeLanguage(language);
    // 通过 this.state 获取数据
    console.log(this.state.language);
  };
}

export const baseModel = new BaseModel(initialState);
```

## 使用

```tsx
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';

const MyComponent = () => {
  // useModel 可以确保始终获取 model 中的最新值，
  // 当 model 中的数据更新时，react组件会自动更新
  const language = useModel(baseModel, 'language');
  return (
    <div>Language is: { language }</div>
  );
}
```

## 其他有用的功能

### 事件监听和触发

每个 model 都包含成员变量 `on` 和 `emit`，作为事件的监听和触发。事件的意义在于进一步将**视图层**和**数据层**彻底隔离

下面的例子，展示了当收到了红包消息时，就弹出抢红包弹窗。但弹窗作为一个**视图层**的变量，不应当被定义在**数据层**。因此在数据层，应当触发一个事件；而在视图层，监听该事件，并弹出弹窗

::: code-group

```ts [@/models/some.ts]
class MyModel extends Model<InitialState> {
  whenReceiveRedPack = () => {
    this.emit('open');
  };
}
```

```tsx [@/pages/some.tsx]
const MyComponent = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    this.on('open', () => {
      // Open dialog
    });
  }, []);
  return (
    <Dialog open={open}>100元</Dialog>
  );
}
```

::: tip
依照此思路，将 `Model` 作为**数据层**时，**视图层**可以是任意框架/库，包括不限于 `react`/`vue`/`angular`。
另一方面，得益于 `@zhangsai/model` 的驱动，数据层可以进一步封装，并做项目级抽离，例如，开发没有视图的 `SDK` 项目
:::
