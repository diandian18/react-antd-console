import i18n from '@/locales';
import router, { RouteConfig } from '@/router';
import type { BreadcrumbItemType } from 'antd/lib/breadcrumb/Breadcrumb';
import { MouseEvent } from 'react';

interface Options {
  showIcon?: boolean;
  showDropdownMenu?: boolean;
}

export function genBreadcrumb(route?: RouteConfig, opts?: Options): BreadcrumbItemType[] {
  const { showIcon, showDropdownMenu } = opts ?? {};
  const ret: BreadcrumbItemType[] = [];
  if (!route) {
    return ret;
  }
  let curr: RouteConfig | undefined = route;

  function onClickItem(e: MouseEvent<HTMLSpanElement>) {
    const pathname = (e.target as HTMLSpanElement).getAttribute('data-pathname') ?? '';
    pathname && router.push(router.getPathname(pathname));
  }

  do {
    const item: BreadcrumbItemType = {
      title: (
        <span data-pathname={curr?.pathname ?? ''} onClick={onClickItem}>{showIcon ? curr.icon : ''} { i18n.t(`menu:${curr.name ?? ''}`) }</span>
      ),
    };
    if (showDropdownMenu && 'children' in curr && curr.children) {
      item.menu = {
        items: curr.children.map(_item => {
          return {
            key: _item!.pathname,
            label: (
              <span onClick={() => {
                router.push(router.getPathname(`${_item.pathname}`));
              }}>{ i18n.t(`menu:${_item.name ?? ''}`) }</span>
            ),
          };
        }),
      }; 
    }
    ret.unshift(item);
    curr = curr.parent;
    if (curr && curr.flatten) {
      curr = curr.parent;
    }
  } while (curr);
  return ret;
}
