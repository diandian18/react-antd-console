import { Model, INITIAL_STATE, Persist, persist } from '@zhangsai/model';
import router from '@/router';
import { withAuthModel } from '@/models/withAuth';

export interface TabItem {
  key: string;
  label?: string;
}

export class InitialState extends INITIAL_STATE {
  @persist
  items: TabItem[] = [];
}

@Persist()
class TabsModel extends Model<InitialState> {
  static className?: string = 'tabs';
  constructor(initialState: InitialState) {
    super(initialState);
  }
  init() {
    this.removeNoPermission();
  }
  destroy() {}

  set(state: Partial<InitialState> | ((draft: InitialState) => void)) {
    this.setState(state);
  }

  /** 新增tab */
  add(newItem: TabItem) {
    const routePath = router.getRoutePath(newItem.key);
    const route = router.flattenRoutes.get(routePath);
    // redirect 路由不add
    if (route?.redirect) {
      return;
    }
    const { items } = this.state;
    if (!items?.find(item => item.key === newItem.key)) {
      this.setState(draft => {
        draft.items.push(newItem);
      });
    }
  }

  /**
   * @returns 删除后应该去往的tab
   * 1. 删别人
   *  返回null
   * 2. 删自己
   *  删除最后一个,返回被删的前一个
   *  删除非最后一个,返回被删的下一个
   *  删的不存在返回null
   */
  /**
   * 
   * @param key 
   * @param isSelf 
   * 
   */
  removeTab(key: string, isSelf: boolean) {
    if (!isSelf) {
      this.setState(draft => {
        draft.items = draft.items.filter((item) => item.key !== `${key}`);
      });
      return null;
    }

    let nextIndex = -1;
    const { items } = this.state;
    if (items.length === 1) return items[0];
    this.setState(draft => {
      draft.items = draft.items.filter((item, _index) => {
        const pass = item.key !== `${key}`;
        if (!pass) {
          nextIndex = (_index === items.length - 1) ?
            (_index - 1) :
            (_index + 0);
        }
        return pass;
      });
    });
    if (nextIndex === -1) {
      return null;
    } else {
      return this.state.items[nextIndex];
    }
  }
  removeOther(key: string) {
    this.setState(draft => {
      draft.items = draft.items.filter((item) => {
        return item.key === `${key}`;
      });
    });
  }
  removeRight(key: string) {
    this.setState(draft => {
      const index = draft.items.findIndex(item => item.key === key);
      draft.items.splice(index + 1, draft.items.length - index - 1);
    });
  }
  removeLeft(key: string) {
    let removed: TabItem[] = [];
    this.setState(draft => {
      const index = draft.items.findIndex(item => item.key === key);
      removed = JSON.parse(JSON.stringify(draft.items.splice(0, index)));
    });
    return removed;
  }
  removeAll() {
    this.setState({ items: [] });
  }
  removeNoPermission() {
    const { items } = this.state;
    const { permissions } = withAuthModel.state;
    const newItems = items.filter(({ key }) => {
      const routePath = router.getRoutePath(key);
      const route = router.flattenRoutes.get(routePath);
      return !route?.permission || route?.permission && permissions[route?.permission]
    });
    this.setState({ items: newItems });
  }
}

export const tabsModel = new TabsModel(new InitialState());
