import { Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const Nest1 = () => {
  const { t: t_menu } = useTranslation('menu');
  return (
    <Card style={{ backgroundColor: '#DB7093' }}>
      <Space orientation="vertical">
        <Card.Meta
          title={t_menu('菜单1')}
          description="/nest/nest1"
        />
      </Space>
    </Card>
  );
};

export default Nest1;
