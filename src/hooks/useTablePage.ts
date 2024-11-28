import { ClassName__ConsoleLayout_RightSideMain } from '@/layouts/ConsoleLayout/consts';
import { SEARCH_LIST_DOM_CLASS } from 'admin-search-list'

const headerFixed = true;

/**
 * 头部不固定时 -> console-layout__right-side
 * 头部固定 + listScroll -> SEARCH_LIST_DOM_CLASS
 * 头部固定 + !listScroll -> ClassName__ConsoleLayout_RightSideMain
 */
export function useScrollContainer(listScroll?: boolean) {
  const backTopTarget = headerFixed ?
    ((listScroll ?? true) ? SEARCH_LIST_DOM_CLASS : `.${ClassName__ConsoleLayout_RightSideMain}`) :
    '.console-layout__right-side';
  return backTopTarget;
}

/**
 * 
 */
export function useTableSticky(listScroll?: boolean) {
  return {
    offsetHeader: (listScroll ?? true) ?
      (headerFixed ? 0 : 0) :
      (headerFixed ? -24 : 0),
  };
}

/**
 * 头部不固定时,tableScroll一定不能滚动
 */
export function useListScroll(listScroll?: boolean) {
  return headerFixed ? (listScroll ?? true) : false;
}
