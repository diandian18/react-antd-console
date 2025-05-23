import { FC } from 'react';
import { Outlet } from 'react-router';
// import KeepAliveOutlet from '@/components/KeepAliveOutlet';
import SideMenu from '@/layouts/SideMenu';
import withAuth from '@/components/business/withAuth';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';
import { ClassName__ConsoleLayout_RightSideMain } from './consts';
import Provider from './store/Provider';
import Tabs from '@/layouts/Tabs';
import { motion } from 'framer-motion';
import { Animations } from './animations';
import Collapse from '../Collapse';
import classNames from 'classnames';
import { isMobile } from '@/utils/browser';
import useStore from './store';
import './index.less';

/**
 * 全局layout
 */
const ConsoleLayout: FC = () => {
  const refreshing = useModel(baseModel, 'refreshing');
  const { collapsed, setCollapsed } = useStore();

  return (
    <div className={classNames('console-layout', {
      isMobile,
    })}>
      {isMobile && !collapsed &&
        <div className="console-layout__overlay" onClick={() => setCollapsed(!collapsed)} />
      }
      <div className="console-layout__left-side">
        <SideMenu />
      </div>
      <div className="console-layout__right-side">
        <Header />
        <div className="console-layout__right-side-tabs">
          <Collapse />
          <Tabs />
        </div>
        <div className="console-layout__right-side-main-wrap">
          {refreshing ? null : (
            <motion.div
              className={ClassName__ConsoleLayout_RightSideMain}
              key={location.pathname}
              variants={Animations['fadeIn']}
              initial="initial"
              animate="in"
              transition={{ type: 'tween', duration: 0.15, ease: 'easeIn' }}
            >
              <Outlet />
            </motion.div>
          )}
        </div>
        {/* <div className={`console-layout__right-side-main-wrap ${ClassName__ConsoleLayout_RightSideMain}`}>
          {refreshing ? null : <KeepAliveOutlet />}
        </div> */}
        <Footer />
      </div>
    </div>
  );
};

const ConsoleLayoutStoreProvider = withAuth(() => {
  return (
    <Provider>
      <ConsoleLayout />
    </Provider>
  );
});

export default ConsoleLayoutStoreProvider;
