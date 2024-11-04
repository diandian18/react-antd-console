import { useContextMenu as useContextMenuByReactContexify } from 'react-contexify';
import { ItemType } from '@/layouts/SideMenu/utils';
import { MouseEvent } from 'react';
import { MENU_ID } from './const';

interface Params {
  item?: ItemType;
  pathname: string;
}

export function useContextMenu({ item, pathname }: Params) {
  const { show } = useContextMenuByReactContexify({
    id: MENU_ID,
  });

  function onContextMenu(event: MouseEvent<HTMLDivElement>) {
    show({
      event,
      props: {
        item,
        pathname,
      },
    });
  }

  return {
    onContextMenu,
  };
}
