import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../SideMenu';
import withAuth from '@/components/business/withAuth';
import Header from '../Header';
import Footer from '../Footer';
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';
import './index.less';

/**
 * 全局layout
 */
const ConsoleLayout: FC = withAuth(() => {
  const refreshing = useModel(baseModel, 'refreshing');
  return (
    <div className="console-layout">
      <div className="console-layout__left-side">
        <SideMenu />
      </div>
      <div className="console-layout__right-side">
        <Header />
        <div className="console-layout__right-side-main">
          {refreshing ? null : <Outlet />}
        </div>
        <Footer />
      </div>
    </div>
  );
});

export default ConsoleLayout;
