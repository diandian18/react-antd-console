import { Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const Nest222 = () => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Card style={{ backgroundColor: '#FF8C00' }}>
      <Space orientation="vertical">
        <Card.Meta
          title={t_menu('菜单2-2-2')}
          description="/nest/nest2/nest2-1/nest2-2-2"
        />
      </Space>
    </Card>
  );
};

export default Nest222;
