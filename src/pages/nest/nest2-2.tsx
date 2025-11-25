import { Card, Space } from 'antd';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const Nest22 = () => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Card style={{ backgroundColor: '#ffc773' }}>
      <Space orientation="vertical">
        <Card.Meta
          title={t_menu('菜单2-2')}
          description="/nest/nest2/nest2-2"
        />
        <Outlet />
      </Space>
    </Card>
  );
};

export default Nest22;
