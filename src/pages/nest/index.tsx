import { Outlet } from 'react-router';
import { Card, Space } from 'antd';
import './index.less';

const Nest = () => {
  return (
    <Card style={{ backgroundColor: '#016a9d' }}>
      <Space orientation="vertical">
        <Card.Meta
          title="/nest"
        />
        <Outlet />
      </Space>
    </Card>
  );
};

export default Nest;
