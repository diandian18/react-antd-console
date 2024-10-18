# Mock

Mock 方案采用 [msw](https://mswjs.io/)

> Mock Service Worker 是一个 API 模拟库，允许您编写与客户端无关的模拟并在任何框架、工具和环境中重复使用它们

`msw` 利用 `service worker`，独立于我们的应用程序，拦截请求并修改响应，从而实现 `mock` 功能

## 目录结构

```shell
.
├── public
│   └── mockServiceWorker.js  # msw 生成，无需改动
├── src
│   ├── mock
│   │   ├── browser.ts        # 注册mock
│   │   ├── passthrough.ts    # 定义哪些文件不被拦截，无需改动
│   │   └── res.ts            # 定义返回的通用数据结构，无需改动
│   └── services
│       └── login.mock.ts     # 定义mock
```

## 初始化

::: code-group

```tsx [src/main.tsx]
async function enableMocking() {
  const { worker } = await import('@/mock/browser');
  return worker.start({
    quiet: true,
    onUnhandledRequest(req, print) {
      // 只对/api/开头的请求链接打印警告信息
      if (new URL(req.url)?.pathname?.startsWith('/api/')) {
        print.warning();
      }
      return;
    },
  });
}

enableMocking().then(async() => {
  root.render(<App />);
});
```

:::

## 如何新增mock？

以**登录请求**为例：

### 定义

::: code-group

```ts [service/login.mock.ts]
import { axiosRes } from '@/mock/res';
import { HttpResponse, http } from 'msw';

export const loginMock = [
  http.post('/api/user/login', async() => {
    const userInfo = userAdmin;
    return HttpResponse.json(axiosRes({
      ...commonInfo,
      ...userInfo,
    }));
  }),
  http.post('/api/user/logout', () => {
    return HttpResponse.json(axiosRes(null));
  }),
];
```

:::

### 注册

::: code-group

```ts [mock/browser.ts]
import { loginMock } from '@/services/login.mock';

export const worker = setupWorker(
  ...loginMock, // [!code ++]
);
```

:::
