# 常见问题

## 子路径作为基础路径时，怎么支持？

想实现例如链接以`/subpath`开头的效果，只需要在 `.env.localhost` 和 `.env.prod` 两个文件中设置 `VITE_BASENAME` 值即可。例如 `'/subpath'`

`VITE_BASENAME` 会体现在：

::: code-group

```tsx [vite.config.ts]
const config: UserConfigExport = {
  base: env.VITE_BASENAME,  // [!code ++]
}
```

```tsx [src/main.tsx]
const basename = import.meta.env.VITE_BASENAME;

async function enableMocking() {
  return worker.start({
    serviceWorker: {
      url: `${basename ?? ''}/mockServiceWorker.js` // [!code ++]
    }
  });
}

enableMocking().then(async() => {
  root.render(
    <HistoryRouter
      history={history}
      basename={basename} // [!code ++]
    >
      <AntdProvider>
        <App />
      </AntdProvider>
    </HistoryRouter>,
  );
});
```

```tsx [src/router/index.ts]
const basename = import.meta.env.VITE_BASENAME;

const router = new Router(routesConfig, {
  basename, // [!code ++]
});
```

```nginx
server {
  listen 80;
  location /subpath {
    alias /your/path/to/dist;
    index index.html;
    try_files $uri /subpath/index.html;
  }
}
```
