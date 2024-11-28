import { DraggableTabPaneProps } from '../useDraggable';
import classNames from 'classnames';
import { JSXElementConstructor, ReactElement, useEffect } from 'react';
import FixAntdTabTranslate from '../FixAntdTabTranslate';
import SvgIcon from '@/components/SvgIcon';
import useTab from '../useTab';
import { setCssVar } from '@/utils/setCssVar';
import { useModel } from '@zhangsai/model';
import { themeModel } from '@/models/theme';
import AnimationWrap from '../AnimationWrap';
import './index.less';

const themeColors = {
  light: {
    // 背景色
    '--tab-bg-color': 'var(--layout-background-color)',
    // 字色
    '--tab-text-color': 'rgba(0, 0, 0, 0.88)',
    // 背景hover色
    '--tab-bg-hover-color': 'rgba(0, 0, 0, 0.06)',
    // 背景active色
    '--tab-bg-active-color': 'var(--container-background-color)',
    '--tab-box-shadow': '0px 0px 6px #ccc',
  },
  dark: {
    '--tab-bg-color': 'var(--layout-background-color)',
    '--tab-text-color': 'rgba(255, 255, 255, 0.85)',
    '--tab-bg-hover-color': 'rgba(255, 255, 255, 0.12)',
    '--tab-bg-active-color': 'var(--container-background-color)',
    '--tab-box-shadow': 'none',
  },
};

interface Props extends DraggableTabPaneProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: ReactElement<any, string | JSXElementConstructor<any>>;
}

const TabChrome = (props: Props) => {
  const {
    menuItem,
    isActive,
    tabItem,
    onClickTab,
    onClickClose,
    isDragging,
    draggableProps,
    draggableKey,
    onContextMenu,
  } = useTab(props);

  const curDarkMode = useModel(themeModel, 'curDarkMode');

  useEffect(() => {
    setCssVar(themeColors[curDarkMode ? 'dark' : 'light']);
  }, [curDarkMode]);

  return (
    <FixAntdTabTranslate node={props.node}>
      <AnimationWrap whileTap={{ scale: !isActive ? 0.9 : 1 }}>
        <div
          className={classNames('console-layout-tab', {
            isActive,
            isDragging,
          })}
          key={draggableKey}
          {...draggableProps}
          onContextMenu={onContextMenu}
          onClick={onClickTab}
        >
          <span className="console-layout-tab__icon">
            {menuItem?.icon}
          </span>
          <span className="console-layout-tab__label">
            {tabItem?.label ? `${tabItem.label} - ${menuItem?.label}` : menuItem?.label}
          </span>
          <span className="console-layout-tab__close" key={props['data-node-key']} onClick={onClickClose}>
            <SvgIcon name="close" />
          </span>
        </div>
      </AnimationWrap>
    </FixAntdTabTranslate>
  );
};

export default TabChrome;
