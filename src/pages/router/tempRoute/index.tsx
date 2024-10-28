import { useTranslation } from 'react-i18next';

/**
 * 临时路由
 */
const TempRoute = () => {
  const { t: t_router } = useTranslation('router');
  return (
    <div>
      {t_router('我是通过router.setSiblings()方法新增的临时路由')}
    </div>
  );
};

export default TempRoute;
