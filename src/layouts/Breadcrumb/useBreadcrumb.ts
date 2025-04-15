import router from '@/router';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { genBreadcrumb } from './utils';
import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';

export default function useBreadcrumb() {
  const language = useModel(baseModel, 'language');
  const location = useLocation();
  // 当前菜单变化时，重新计算面包屑数据
  const items = useMemo(() => {
    const route = router.flattenRoutes.get(router.getRoutePath(location.pathname));
    const breadcrumb = genBreadcrumb(route, {
      showIcon: true,
      showDropdownMenu: false,
    });
    return breadcrumb;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, language]);

  return items;
}