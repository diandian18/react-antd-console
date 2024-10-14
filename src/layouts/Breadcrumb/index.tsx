import { Breadcrumb as AntdBreadcrumb } from 'antd';
import useBreadcrumb from './useBreadcrumb';
import './index.less';

const Breadcrumb = () => {
  const items = useBreadcrumb();
  return (
    <AntdBreadcrumb
      className="console-layout-breadcrumb"
      items={items} 
    />
  );
};

export default Breadcrumb;

