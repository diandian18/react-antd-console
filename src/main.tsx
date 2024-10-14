import { history, HistoryRouter } from '@/router';
import { i18nInit } from '@/locales';
import App from './App';
import { createRoot } from 'react-dom/client';
import AntdProvider from './components/AntdProvider/Provider';
import { enableMapSet } from 'immer';
import 'dayjs/locale/zh-cn';
import 'virtual:svg-icons-register';

enableMapSet();

async function enableMocking() {
  const { worker } = await import('@/mock/browser');
  return worker.start({
    quiet: true,
    onUnhandledRequest(req, print) {
      if (new URL(req.url)?.pathname?.startsWith('/api/')) {
        print.warning();
      }
      return;
    },
  });
}

const root = createRoot(document.getElementById('root')!);

enableMocking().then(async() => {
  await i18nInit();
  root.render(
    <HistoryRouter history={history}>
      <AntdProvider>
        <App />
      </AntdProvider>
    </HistoryRouter>,
  );
});