import classNames from 'classnames';
import { Menu } from 'antd';
import router, { useRouter } from '@/router';
import { history } from '@/router';
import type { MenuInfo } from 'rc-menu/lib/interface.d';
import { useMenuStatus } from './hooks';
import { baseModel } from '@/models/base';
import { useModel } from '@zhangsai/model';
import useStore from '@/layouts/ConsoleLayout/store';
import './index.less';

/**
 * Layout菜单
 */
const SideMenu = () => {
  const logo = useModel(baseModel, 'logo');
  const { flattenRoutes } = useRouter(router);
  const { menuItems, collapsed } = useStore();

  const {
    openKeys, setOpenKeys,
    selectedKeys, setSelectedKeys,
  } = useMenuStatus();

  function onClickMenuItem(info: MenuInfo) {
    const { key } = info;
    const clickingRoute = flattenRoutes.get(key);
    if (clickingRoute?.external) {
      window.open(clickingRoute.path);
    } else {
      const { key, keyPath } = info;
      setOpenKeys(keyPath.slice(1));
      setSelectedKeys([key]);
      history.push(router.getPathname(key));
    }
  }

  function onOpenChange(_openKeys: string[]) {
    setOpenKeys(_openKeys);
  }

  if (!menuItems.length) return null;

  return (
    <div className={classNames('side-menu', {
      collapsed,
    })}
      style={{
        width: collapsed ? 60 : 230,
      }}
    >
      <div className="side-menu__header">
        <img className="side-menu__header-logo" src={logo} alt="react-antd-console" />
        <h3>react-antd-console</h3>
      </div>
      <Menu
        className="side-menu__antd-menu"
        mode="inline"
        inlineCollapsed={collapsed}
        items={menuItems}
        selectedKeys={selectedKeys}
        onClick={onClickMenuItem}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default SideMenu;
