import { Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const Nest221 = () => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Card style={{ backgroundColor: '#99ab4e' }}>
      <Space orientation="vertical">
        <Card.Meta
          title={t_menu('菜单2-2-1')}
          description="/nest/nest2/nest2-1/nest2-2-1"
        />
      </Space>
    </Card>
  );
};

export default Nest221;
