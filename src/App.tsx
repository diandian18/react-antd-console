import { useRoutes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import router, { useRouter } from '@/router';
import { DEFAULT_TITLE, logo } from './consts';
import { useTranslation } from 'react-i18next';
import Progress from '@/components/Progress';
import '@/styles/index.less';

function App() {
  const { curRoute, reactRoutes } = useRouter(router);
  const element = useRoutes(reactRoutes);
  const { t: t_menu } = useTranslation('menu');

  return (
    <HelmetProvider>
      <Helmet>
        <title>{curRoute?.name ? `${t_menu(curRoute.name)} - ${DEFAULT_TITLE}` : DEFAULT_TITLE}</title>
        <link rel="icon" type="image/x-icon" href={logo} data-rh="true"></link>
      </Helmet>
      <Progress />
      { element }
    </HelmetProvider>
  );
}

export default App;
