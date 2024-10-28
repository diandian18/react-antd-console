import type { RouteConfig } from '@/router';
import i18n from '@/locales';
import type { MenuItemType } from 'antd/lib/menu/interface';

export interface ItemType extends MenuItemType {
  icon?: React.ReactNode;
  title?: string;
  children?: ItemType[];
  parent?: ItemType;
  external?: boolean;
  popupClassName?: string;
}

/**
 * 根据RouteConfig, 生成antd Menu组件的item属性所需的数据
 */
export function generateMenuItems(_routes: RouteConfig[], _permissions: Record<string, boolean>, parent?: ItemType): ItemType[] {
  const ret: ItemType[] = [];
  for (let i = 0; i < _routes.length; i++) {
    const { collecttedPathname = [], icon, name, hidden, flatten, children, redirect, permission, external } = _routes[i];
    if (redirect || (permission && !_permissions?.[permission])) {
      continue;
    }
    if (flatten) {
      const menuChildren = generateMenuItems(children ?? [], _permissions, parent);
      ret.push(...menuChildren);
      continue;
    }
    const itemRet: ItemType = {
      key: collecttedPathname[collecttedPathname.length - 1], // key作为了收集的路由
      label: i18n.t(`menu:${name}`),
      icon,
      parent,
      external,
      popupClassName: 'side-menu__antd-submenu',
    };
    if (children) {
      const menuChildren = generateMenuItems(children ?? [], _permissions, itemRet);
      itemRet.children = menuChildren;
    }
    if (!hidden) {
      ret.push(itemRet);
    }
  }
  return ret;
}
