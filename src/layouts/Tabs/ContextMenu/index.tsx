import { Menu, Item, Separator, ItemParams } from 'react-contexify';
import { baseModel } from '@/models/base';
import { tabsModel } from '@/models/tabs';
import router from '@/router';
import { useCloseTab } from '../useTab';
import { requestFullscreen } from '@/layouts/FullScreen/utils';
import { ClassName__ConsoleLayout_RightSideMain } from '@/layouts/ConsoleLayout/consts';
import { MENU_ID } from './const';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { useEffect } from 'react';
import { themeColors } from './style';
import { useModel } from '@zhangsai/model';
import { themeModel } from '@/models/theme';
import { setCssVar } from '@/utils/setCssVar';

import 'react-contexify/dist/ReactContexify.css';
import './index.less';

const ContextMenu: React.FC = () => {
  const { t: t_layout } = useTranslation('layout');
  const curDarkMode = useModel(themeModel, 'curDarkMode');

  function onClickRefresh() {
    baseModel.refresh();
  }

  const closeTab = useCloseTab();
  function onClickCloseSelf({ props }: ItemParams) {
    closeTab(props.pathname);
  }

  function onClickCloseOther({ props }: ItemParams) {
    tabsModel.removeOther(props.pathname);
    router.push(props.pathname);
  }

  function onClickCloseRight({ props }: ItemParams) {
    tabsModel.removeRight(props.pathname);
    router.push(props.pathname);
  }

  function onClickCloseLeft({ props }: ItemParams) {
    const removed = tabsModel.removeLeft(props.pathname);
    // 如果右击的是当前tab的右侧,则跳转到被右击的tab
    if (removed.some(({ key }) => key === location.pathname)) {
      router.push(props.pathname);
    }
  }

  function onClickFullscreen() {
    requestFullscreen(`.${ClassName__ConsoleLayout_RightSideMain}`);
  }

  useEffect(() => {
    setCssVar(themeColors[curDarkMode ? 'dark' : 'light']);
  }, [curDarkMode]);

  return (
    <Menu className="console-layout__context-menu"
      id={MENU_ID}
    >
      <Item onClick={onClickCloseSelf}>
        <SvgIcon name="close_circle" />{t_layout('关闭')}
      </Item>
      <Item onClick={onClickCloseOther}>
        <SvgIcon name="close_other" />{t_layout('关闭其他')}
      </Item>
      <Item onClick={onClickCloseRight}>
        <SvgIcon name="close_right" />{t_layout('关闭右侧')}
      </Item>
      <Item onClick={onClickCloseLeft}>
        <SvgIcon name="close_left" />{t_layout('关闭左侧')}
      </Item>
      <Separator />
      <Item onClick={() => onClickRefresh()}>
        <SvgIcon name="refresh" />{t_layout('刷新')}
      </Item>
      <Item onClick={onClickFullscreen}>
        <SvgIcon name="fullscreen" />{t_layout('全屏')}
      </Item>
    </Menu>
  );
};

export default ContextMenu;
