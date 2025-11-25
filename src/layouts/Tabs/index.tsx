import { Tabs as AntdTabs } from 'antd';
import { useEffect, useMemo } from 'react';
import useStore from '@/layouts/ConsoleLayout/store';
import { TabItem, tabsModel } from '@/models/tabs';
import { useModel } from '@zhangsai/model';
import { ItemType } from '../SideMenu/utils';
import { DndContext, DragEndEvent, PointerSensor, useSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TabChrome from './TabChrome';
import { useContextMenu } from './ContextMenu/useContextMenu';
import ContextMenu from './ContextMenu';
import { useLocation } from 'react-router';
import router from '@/router';
import { getUrlQuery } from '@/utils';
import { tab_title } from '@/consts';
import './index.less';

interface Props {
  item: ItemType;
  label?: string;
  pathname: string;
  tabsIconShow?: boolean;
}

export const Label: React.FC<Props> = ({ item, label, pathname, tabsIconShow }) => {
  const { onContextMenu } = useContextMenu({
    item,
    pathname,
  });
  return (
    <div onContextMenu={onContextMenu}>
      {tabsIconShow ? item.icon : ''} {label ? `${label} - ${item.label}` : item.label}
    </div>
  );
};

function getTabsItemsByMenuItemKey(items: TabItem[], allFlattenMenuItems: Map<React.Key, ItemType>, tabsIconShow: boolean) {
  return items.filter(({ key }) => {
    const routePath = router.getRoutePath(key);
    return allFlattenMenuItems.get(routePath);
  }).map(({ key, label }) => {
    const routePath = router.getRoutePath(key);
    const menuItem = allFlattenMenuItems.get(routePath)!;
    return {
      key,
      label: <Label item={menuItem} label={label} pathname={key} tabsIconShow={tabsIconShow} />,
    };
  });
}

const Tabs = () => {
  const items = useModel(tabsModel, 'items');
  const { allFlattenMenuItems } = useStore();
  const tabsItems = useMemo(() => {
    return getTabsItemsByMenuItemKey(items, allFlattenMenuItems, true);
  }, [allFlattenMenuItems, items]);
  const location = useLocation();

  function onChange(activeKey: string) {
    router.push(activeKey);
  }

  function onEdit(
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) {
    if (action === 'remove') {
      const isSelf = location.pathname === targetKey;
      const nextTab = tabsModel.removeTab(targetKey as string, isSelf);
      if (isSelf && nextTab) {
        router.push(nextTab.key);
      }
    }
  }

  useEffect(() => {
    const url_tab_title = getUrlQuery(tab_title);
    const tabItem = {
      key: location.pathname,
      label: url_tab_title ?? '',
    };
    tabsModel.add(tabItem);
  }, [location.pathname]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  function onDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id) {
      const activeIndex = items.findIndex((item) => item.key === active.id);
      const overIndex = items.findIndex((item) => item.key === over?.id);
      const ret = arrayMove(items, activeIndex, overIndex);
      tabsModel.set({ items: ret });
    }
  }

  return (
    <div className="console-layout-tabs CHROME">
      <AntdTabs
        classNames={{
          popup: {
            root: 'console-layout-tabs__popup',
          },
        }}
        type="editable-card"
        size="small"
        hideAdd
        activeKey={location.pathname}
        onChange={onChange}
        onEdit={onEdit}
        defaultActiveKey={location.pathname}
        items={tabsItems}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={tabsItems.map((i) => i.key)} // onDragEnd -> active.id/over?.id
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => {
                  return <TabChrome node={node} data-node-key={node.key as string} {...tabBarProps} />;
                }}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
      <ContextMenu />
    </div>
  );
};

export default Tabs;
