import { tabsModel } from '@/models/tabs';
import { history } from '@/router';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function useCloseTab(menuKey?: string) {
  const location = useLocation();

  const closeTab = useCallback((_menuKey?: string) => {
    const finallyMenuKey = menuKey ?? _menuKey;
    if (!finallyMenuKey) return;
    const nextTab = tabsModel.removeTab(finallyMenuKey, location.pathname === finallyMenuKey);
    if (/** menuItem?.key === finallyMenuKey && */nextTab) {
      history.push(nextTab.key);
    }
  }, [location.pathname, menuKey]);

  return closeTab;
}
