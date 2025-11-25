import router from '@/router';
import { getRandomString } from '@/utils';
import { Alert, Button, Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';

/**
 * 动态路由
 */
const RouterDynamic = () => {
  const { t: t_router } = useTranslation('router');
  
  function genNewRoute() {
    const newPath = getRandomString();
    const newRoute = {
      path: newPath,
      component: () => import('@/pages/router/tempRoute'),
      name: `临时路由-${newPath}`,
    };
    return newRoute;
  }

  function onClickAddTail() {
    router.setSiblings((routesConfig) => {
      routesConfig.push(genNewRoute());
    });
  }

  function onClickAddHead() {
    router.setSiblings((routesConfig) => {
      routesConfig.unshift(genNewRoute());
    });
  }

  function onClickAddMiddle(index: number) {
    router.setSiblings((routesConfig) => {
      routesConfig.splice(index, 0, genNewRoute());
    });
  }

  function onClickDelTail() {
    router.setSiblings((routesConfig) => {
      routesConfig.pop();
    });
  }

  function onClickDelHead() {
    router.setSiblings((routesConfig) => {
      routesConfig.shift();
    });
  }

  function onClickDelMiddle(index: number) {
    router.setSiblings((routesConfig) => {
      routesConfig.splice(index, 1);
    });
  }

  function onClickAddAny() {
    router.setSiblings('/error-page', (routesConfig) => {
      routesConfig.push(genNewRoute());
    });
  }

  function onClickDelAny() {
    router.setSiblings('/error-page', (routesConfig, parent) => {
      parent.children = routesConfig.filter(item => {
        return !item.name?.startsWith('临时路由-');
      });
    });
  }

  function onClickEdit() {
    router.setItem((routesConfigItem) => {
      routesConfigItem.name = t_router('被动态修改的路由');
      routesConfigItem.icon = <SvgIcon name="nintendo" />;
    });
  }

  function onClickReset() {
    router.setItem((routesConfigItem) => {
      routesConfigItem.name = '动态路由';
      routesConfigItem.icon = <SvgIcon name="menu2" />;
    });
  }

  return (
    <div>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Alert title={t_router('路由的变化会导致整体组件重新渲染，建议在渲染页面之前完成路由的变化操作')} type="warning" showIcon />
        <Card title={t_router('动态新增路由')}>
          <Space>
            <Button type="primary" onClick={onClickAddTail}>{t_router('新增尾部')}</Button>
            <Button type="primary" onClick={onClickAddHead}>{t_router('新增头部')}</Button>
            <Button type="primary" onClick={() => onClickAddMiddle(2)}>{t_router('新增中间')}</Button>
          </Space>
        </Card>
        <Card title={t_router('动态删除路由')}>
          <Space>
            <Button danger onClick={onClickDelTail}>{t_router('删除尾部')}</Button>
            <Button danger onClick={onClickDelHead}>{t_router('删除头部')}</Button>
            <Button danger onClick={() => onClickDelMiddle(2)}>{t_router('删除中间')}</Button>
          </Space>
        </Card>
        <Card title={t_router('在指定位置动态新增路由')} extra={t_router('指定在“外链”后新增')}>
          <Space>
            <Button type="primary" onClick={onClickAddAny}>{t_router('在指定位置动态新增路由')}</Button>
            <Button danger onClick={onClickDelAny}>{t_router('删除新增的路由')}</Button>
          </Space>
        </Card>
        <Card title={t_router('动态修改路由')}>
          <Space>
            <Button type="primary" onClick={onClickEdit}>{t_router('修改当前路由')}</Button>
            <Button onClick={onClickReset}>{t_router('重置')}</Button>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default RouterDynamic;
