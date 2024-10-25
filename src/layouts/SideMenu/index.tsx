import classNames from 'classnames';
import { Menu } from 'antd';
import router from '@/router';
import { history } from '@/router';
import type { MenuInfo } from 'rc-menu/lib/interface.d';
import { useMenuStatus } from './hooks';
import { useMemo, useState } from 'react';
import { baseModel } from '@/models/base';
import { withAuthModel } from '@/models/withAuth';
import { useModel } from '@zhangsai/model';
import { generateMenuItems } from './utils';
import { logo } from '@/consts';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

/**
 * Layout菜单
 */
const SideMenu = () => {
  const permissions = useModel(withAuthModel, 'permissions');
  const language = useModel(baseModel, 'language');
  /** 根据权限和语言生成菜单数据 */
  const menuItems = useMemo(() => {
    return generateMenuItems(router.routes, permissions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions, language, router.routes]);
  /** 展开菜单 */
  const [collapsed, setCollapsed] = useState(false);

  const {
    openKeys, setOpenKeys,
    selectedKeys, setSelectedKeys,
    expandByPathname,
  } = useMenuStatus();

  function onClickMenuItem(info: MenuInfo) {
    const { key, keyPath } = info;
    setOpenKeys(keyPath.slice(1));
    setSelectedKeys([key]);
    history.push(router.getPathname(key));
  }

  function onOpenChange(_openKeys: string[]) {
    setOpenKeys(_openKeys);
  }

  function onClickCollapse() {
    setCollapsed(!collapsed);
    expandByPathname(location.pathname);
  }

  if (!menuItems.length) return null;

  return (
    <div className={classNames('side-menu', {
      collapsed,
    })}
      style={{
        width: collapsed ? 80 : 265,
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
      <div className="side-menu__footer" onClick={onClickCollapse}>
        <span>
          {collapsed ? <SvgIcon name="menu_fold" /> : <SvgIcon name="menu_unfold" />}
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
