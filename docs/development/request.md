# 请求

## 概述

http请求采用了 [axios](https://axios-http.com/docs/intro) 方案。封装并导出了一个`axios` 实例。

## 请求拦截

`axios` 实例拦截了所有的请求，并把 `token` 放到了 `http header` 中。
详见 `src/http/index.ts` 中的 `request.interceptors.request.use`

## 响应拦截

`axios` 实例拦截了所有请求的响应

- 若返回错误，则统一弹窗
- 可针对具体 `http状态码` 和 `业务code` 配置统一拦截，如 `401` 跳转登录页

详见 `src/http/index.ts` 中的 `request.interceptors.response.use`

## 如何编写请求方法？

:::tip
很多使用 TypeScript 的 coder 容易忽略的一点：对于请求响应的返回值，应当能体现出其类型。我们应该在请求方法上定义好**请求体类型**和**响应体类型**。这样在方法执行的地方，就可以方便地看到返回值的类型。
:::

以登录请求为例：

### 定义

::: code-group

```ts [service/login.ts]
import request from '@/http';

/** 定义请求体 */
interface HttpPostLoginReq {
  userAccount: string;
  userPassword: string;
}

/** 定义响应体 */
interface HttpPostLoginRes {
  userAccount: string;
  userId: number; 
  permissions: string[];
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

/** 登录请求方法 */
export async function httpPostLogin(data: HttpPostLoginReq) {
  // 响应泛型
  return request.post<API.HttpResult<HttpPostLoginRes>>('/user/login', data);
}
```

:::

`src/http/API.d.ts` 文件中定义了几种通用的全局返回类型，这里使用的 `API.HttpResult`

::: code-group

```ts [src/http/API.d.ts]
declare namespace API {
  export interface HttpResult<D> {
    code: string;
    message: string;
    data: D;
  }
}
```

:::

`post` 方法的`响应泛型`，最终会反映到 `httpPostLogin` 调用时的返回数据 `data` 上

### 使用

::: code-group

```ts [src/pages/login/LoginForm.tsx]

import { httpPostLogin } from '@/services/login';

httpPostLogin({
  userAccount,
  userPassword,
}).then(({ data: { data } }) => {
  // data 会显示出返回数据的类型
}).catch(() => {});
```

:::

- 该请求因为全局请求拦截，会把 `token` 放到 `http header` 里
- 若请求成功，则返回的 `data` 的类型，是 `httpPostLogin` 方法定义中的`响应泛型`
- 若请求失败，则会因为全局响应拦截，自动弹窗报错。同时也可以在 `catch` 中定义其他逻辑
  - 若不想自动弹窗报错，则可在请求的 `config` 参数中传递 `silence` 为 `true`
  - 若不想全局拦截生效，则可在请求的 `config` 参数中传递 `ignoreResponseIC` 为 `false`

```typescript
export async function httpPostLogin(data: HttpPostLoginReq) {
  return request.post<API.HttpResult<HttpPostLoginRes>>('/user/login', data, {
    silence: true,
    ignoreResponseIC: true,
  });
}
```
