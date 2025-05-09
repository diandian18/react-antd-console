import { useRoutes } from 'react-router';
import router, { useRouter } from '@/router';
import { DEFAULT_TITLE, logo } from './consts';
import { useTranslation } from 'react-i18next';
import Progress from '@/components/Progress';
import { AnimatePresence } from 'framer-motion';
import '@/styles/index.less';

function App() {
  const { curRoute, reactRoutes } = useRouter(router);
  // 这里类型会报错。因为react-router和react-router-dom的类型不一致
  const element = useRoutes(reactRoutes);
  const { t: t_menu } = useTranslation('menu');

  return (
    <>
      <title>{curRoute?.name ? `${t_menu(curRoute.name)} | ${DEFAULT_TITLE}` : DEFAULT_TITLE}</title>
      <link rel="icon" type="image/x-icon" href={logo} data-rh="true"></link>
      <Progress />
      <AnimatePresence mode="wait">
        { element }
      </AnimatePresence>
    </>
  );
}

export default App;
