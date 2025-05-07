import { useMemo, useRef, useState } from 'react';
import { generateMenuItems } from '@/layouts/SideMenu/utils';
import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import { baseModel } from '@/models/base';
import router, { useRouter } from '@/router';
import { useLocation } from 'react-router';
import { Context, StoreContextType } from './index';
import { createProvider } from '@/components/store';
import { isMobile } from '@/utils/browser';

const Provider = createProvider<StoreContextType>({
  Context,
  useValue: () => {
    const permissions = useModel(withAuthModel, 'permissions');
    const language = useModel(baseModel, 'language');
    const { routes } = useRouter(router);
    /** 根据权限和语言生成菜单数据 */
    const { menuItems, flattenMenuItems, allFlattenMenuItems } = useMemo(() => {
      const ret = generateMenuItems(routes, permissions);
      // console.log('flattenMenuItems: ', ret.flattenMenuItems);
      // console.log('allFlattenMenuItems: ', ret.allFlattenMenuItems);
      return ret;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permissions, language, routes]);
    /** 展开菜单 */
    const [collapsed, setCollapsed] = useState(isMobile ? true : false);

    const location = useLocation();

    const curRoutePath = useMemo(() => {
      return router.getRoutePath(location.pathname);
    }, [location.pathname]);

    const curMenuItem = allFlattenMenuItems.get(curRoutePath);

    /** 移动端 */
    const [mobileCollapsed, setMobileCollapsed] = useState(false);

    /** 引导 */
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const value = {
      menuItems,
      flattenMenuItems,
      allFlattenMenuItems,
      collapsed, setCollapsed,
      curMenuItem,
      mobileCollapsed, setMobileCollapsed,
      ref1, ref2, ref3,
    };

    return value;
  },
});

export default Provider;
