import { Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const Nest21 = () => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Card style={{ backgroundColor: '#e47960' }}>
      <Space orientation="vertical">
        <Card.Meta
          title={t_menu('菜单2-1')}
          description="/nest/nest2/nest2-1"
        />
      </Space>
    </Card>
  );
};

export default Nest21;
