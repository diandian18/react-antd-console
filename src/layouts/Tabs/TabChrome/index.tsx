import useDraggable, { DraggableTabPaneProps } from '../useDraggable';
import useStore from '@/layouts/ConsoleLayout/store';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useContextMenu } from '../ContextMenu/useContextMenu';
import { history } from '@/router';
import { useCloseTab } from '../useTabUtils';
import styled from 'styled-components';
import Hover from '@/components/Hover';
import { useModel } from '@zhangsai/model';
import { JSXElementConstructor, MouseEvent, ReactElement, useMemo } from 'react';
import FixAntdTabTranslate from '../FixAntdTabTranslate';
import { omit } from '@/utils';
import router from '@/router';
import { tabsModel } from '@/models/tabs';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

const WrapDiv = styled.div<{
  $isActive: boolean;
  $isHovering: boolean;
  $darkMode: boolean;
  $colorPrimaryBgHover: string;
  $colorPrimaryText: string;
  $colorBgLayout: string;
  $colorBgContainer: string;
}>`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 4px;
  margin-left: 4px;
  background: ${props => props.$colorBgLayout};
  &.isHovering {
    background: ${props => props.$colorPrimaryBgHover};
    border-radius: 10px;
  }
  &.isActive {

    position: relative;
    background-color: ${props => props.$colorBgContainer};
    box-shadow: 0px 8px 0px 0px ${props => props.$colorBgContainer}, 0 8px 0 0 ${props => props.$colorBgContainer};
    border-radius: 10px 10px 0 0;
    margin-bottom: 4px;

    &:before, &:after {
      position: absolute;
      bottom: -4px;
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 100%;
      box-shadow: 0 0 0 40px #fff;
    }

    &:before {
      left: -20px;
      clip-path: inset(50% 0 0 50%);
    }
    &:after {
      right: -20px;
      clip-path: inset(50% 50% 0 0);
    }
  }
`;

interface Props extends DraggableTabPaneProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: ReactElement<any, string | JSXElementConstructor<any>>;
}

const TabChrome = (props: Props) => {
  const propsMenuKey = props['data-node-key'];
  const tabItems = useModel(tabsModel, 'items');
  const tabItem = useMemo(() => {
    return tabItems.find(item => item.key === propsMenuKey);
  }, [propsMenuKey, tabItems]);
  const location = useLocation();
  const { draggableProps, isDragging } = useDraggable(props);
  const memoedDraggableProps = useMemo(() => {
    return omit(draggableProps, ['key']);
  }, [draggableProps]);
  const isActive = location.pathname === propsMenuKey;
  const colorPrimaryText = '#1677ff';
  const colorText = 'rgba(0, 0, 0, 0.88)';
  const colorBgTextHover = 'rgba(0, 0, 0, 0.06)';
  const colorBgContainer = '#fff';
  const colorBgLayout = '#edeff0';
  const curDarkMode = false;

  const tabsIconShow = true;

  const { allFlattenMenuItems } = useStore();
  const propsRoutePath = router.getRoutePath(propsMenuKey);
  const menuItem = allFlattenMenuItems.get(propsRoutePath);
  const { onContextMenu } = useContextMenu({
    item: menuItem,
    pathname: propsMenuKey,
  });

  function onClickTab() {
    history.push(propsMenuKey);
  }

  const closeTab = useCloseTab(propsMenuKey);
  function onClickClose(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    closeTab();
  }

  return (
    <FixAntdTabTranslate node={props.node}>
      <Hover>{(isHovering: boolean) => (
        <WrapDiv
          $isActive={isActive}
          $isHovering={isHovering}
          $darkMode={curDarkMode}
          $colorPrimaryBgHover={colorBgTextHover}
          $colorPrimaryText={colorPrimaryText}
          $colorBgLayout={colorBgLayout}
          $colorBgContainer={colorBgContainer}

          className={classNames('console-layout-tab', {
            isActive,
            isDragging,
            isHovering,
          })}
          key={draggableProps.key}
          {...memoedDraggableProps}
          onContextMenu={onContextMenu}
          onClick={onClickTab}
        >
          {tabsIconShow && (
            <span className="console-layout-tab__icon" style={{
              color: isActive ? colorPrimaryText : colorText,
            }}>{menuItem?.icon}</span>
          )}
          <span className="console-layout-tab__label" style={{
            color: isActive ? colorPrimaryText : colorText,
          }}>{tabItem?.label ? `${tabItem.label} - ${menuItem?.label}` : menuItem?.label}</span>
          <Hover>{(isHovering: boolean) => (
            <div className="console-layout-tab__close" style={{
              color: isActive ? colorPrimaryText : colorText,
              backgroundColor: isHovering ? colorBgTextHover : undefined,
            }} key={propsMenuKey} onClick={onClickClose}>
              <SvgIcon name="close" />
            </div>
          )}</Hover>
        </WrapDiv>
      )}</Hover>
    </FixAntdTabTranslate>
  );
};

export default TabChrome;
