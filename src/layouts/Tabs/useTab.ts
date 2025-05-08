import useDraggable, { DraggableTabPaneProps } from './useDraggable';
import useStore from '@/layouts/ConsoleLayout/store';
import { useLocation } from 'react-router';
import { useContextMenu } from './ContextMenu/useContextMenu';
import { useModel } from '@zhangsai/model';
import { JSXElementConstructor, MouseEvent, ReactElement, useMemo, useCallback } from 'react';
import { omit } from '@/utils';
import router from '@/router';
import { tabsModel } from '@/models/tabs';

interface Props extends DraggableTabPaneProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: ReactElement<any, string | JSXElementConstructor<any>>;
}

export default function useTab(props: Props) {
  const propsMenuKey = props['data-node-key'];
  const tabItems = useModel(tabsModel, 'items');
  const tabItem = useMemo(() => {
    return tabItems.find(item => item.key === propsMenuKey);
  }, [propsMenuKey, tabItems]);
  const location = useLocation();
  const { draggableProps: _draggableProps, isDragging } = useDraggable(props);
  const draggableProps = useMemo(() => {
    return omit(_draggableProps, ['key']);
  }, [_draggableProps]);

  const isActive = location.pathname === propsMenuKey;

  const { allFlattenMenuItems } = useStore();
  const propsRoutePath = router.getRoutePath(propsMenuKey);
  const menuItem = allFlattenMenuItems.get(propsRoutePath);
  const { onContextMenu } = useContextMenu({
    item: menuItem,
    pathname: propsMenuKey,
  });

  function onClickTab() {
    router.push(propsMenuKey);
  }

  const closeTab = useCloseTab(propsMenuKey);
  function onClickClose(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    closeTab();
  }

  return {
    menuItem,
    tabItem,
    isActive,
    onClickTab,
    onClickClose,

    isDragging,
    draggableProps,
    draggableKey: _draggableProps.key,

    onContextMenu,
  };
}

export function useCloseTab(menuKey?: string) {
  const location = useLocation();

  const closeTab = useCallback((_menuKey?: string) => {
    const finallyMenuKey = menuKey ?? _menuKey;
    if (!finallyMenuKey) return;
    const nextTab = tabsModel.removeTab(finallyMenuKey, location.pathname === finallyMenuKey);
    if (/** menuItem?.key === finallyMenuKey && */nextTab) {
      router.push(nextTab.key);
    }
  }, [location.pathname, menuKey]);

  return closeTab;
}
