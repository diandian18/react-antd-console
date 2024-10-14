import { useRoutes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import router, { useRouter } from '@/router';
import { DEFAULT_TITLE, logo } from './consts';
import { useTranslation } from 'react-i18next';
import '@/styles/index.less';

function App() {
  const { curRoute } = useRouter(router);
  const element = useRoutes(router.reactRoutes);
  const { t: t_menu } = useTranslation('menu');

  return (
    <HelmetProvider>
      <Helmet>
        <title>{curRoute?.name ? `${t_menu(curRoute.name)} - ${DEFAULT_TITLE}` : DEFAULT_TITLE}</title>
        <link rel="icon" type="image/x-icon" href={logo} data-rh="true"></link>
      </Helmet>
      { element }
    </HelmetProvider>
  );
}

export default App;
