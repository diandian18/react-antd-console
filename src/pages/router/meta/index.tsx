import SvgIcon from '@/components/SvgIcon';
import { baseModel } from '@/models/base';
import router from '@/router';
import { Button, Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * 动态meta
 */
const Meta = () => {
  const { t: t_router } = useTranslation('router');
  
  function onClickEditTitle() {
    router.setItem((routesConfigItem) => {
      routesConfigItem.name = 'rac';
    });
  }
  function onClickResetTitle() {
    router.setItem((routesConfigItem) => {
      routesConfigItem.name = '动态meta';
    });
  }

  function onClickEditLogo() {
    baseModel.setLogo('/images/react.svg');
  }
  function onClickResetLogo() {
    baseModel.setLogo('/images/logo.png');
  }
  
  function onClickEditIcon() {
    router.setItem((routesConfigItem) => {
      routesConfigItem.icon = <SvgIcon name="nintendo" />;
    });
  }
  function onClickResetIcon() {
    router.setItem((routesConfigItem) => {
      routesConfigItem.icon = null;
    });
  }
  
  return (
    <div>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Card title={t_router('标题')}>
          <Space>
            <Button type="primary" onClick={onClickEditTitle}>{t_router('修改标题为rac')}</Button>
            <Button onClick={onClickResetTitle}>{t_router('重置')}</Button>
          </Space>
        </Card>
        <Card title={t_router('Logo')}>
          <Space>
            <Button type="primary" onClick={onClickEditLogo}>{t_router('修改logo')}</Button>
            <Button onClick={onClickResetLogo}>{t_router('重置')}</Button>
          </Space>
        </Card>
        <Card title={t_router('Icon')}>
          <Space>
            <Button type="primary" onClick={onClickEditIcon}>{t_router('修改Icon')}</Button>
            <Button onClick={onClickResetIcon}>{t_router('重置')}</Button>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default Meta;
