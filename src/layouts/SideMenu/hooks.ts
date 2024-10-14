import { useLocation } from 'react-router-dom';
import router, { tryFindRouteFather } from '@/router';
import { useCallback, useEffect, useState } from 'react';

export function useMenuStatus() {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const expandByPathname = useCallback(function expandByPathname(pathname: string) {
    const routePath = router.getRoutePath(pathname);
    const curRoute = router.flattenRoutes.get(routePath);
    const _openKeys = curRoute?.collecttedPathname ?? [];
    const trueOpenKeys = _openKeys.slice(0, _openKeys.length - 1);
    setOpenKeys(trueOpenKeys);
    const trueSelectedKeys = [tryFindRouteFather(_openKeys[_openKeys.length - 1], curRoute?.hidden)];
    setSelectedKeys(trueSelectedKeys);
  }, []);

  useEffect(() => {
    expandByPathname(location.pathname);
  }, [expandByPathname, location.pathname]);

  return {
    openKeys, setOpenKeys,
    selectedKeys, setSelectedKeys,
    expandByPathname,
  };
}
