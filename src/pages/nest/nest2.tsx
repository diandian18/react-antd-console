import { Card, Space } from 'antd';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const Nest2 = () => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Card style={{ backgroundColor: '#7B68EE' }}>
      <Space orientation="vertical">
        <Card.Meta
          title={t_menu('菜单2')}
          description="/nest/nest2"
        />
        <Outlet />
      </Space>
    </Card>
  );
};

export default Nest2;
