import { ItemType } from '@/layouts/SideMenu/utils';
import { createStore } from '@/components/store';

export interface StoreContextType {
  /** 菜单(树型) */
  menuItems: ItemType[];
  /** 菜单(一维) */
  flattenMenuItems: Map<React.Key, ItemType>;
  /** 菜单(一维), 包含被hidden的 */
  allFlattenMenuItems: Map<React.Key, ItemType>;
  /** 菜单收起 */
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  /** 移动端菜单收起 */
  mobileCollapsed: boolean;
  setMobileCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  ref1: React.RefObject<null>;
  ref2: React.RefObject<null>;
  ref3: React.RefObject<null>;
}

const store = createStore<StoreContextType>();
const { useStore, Context } = store;
export { Context };
export default useStore;

