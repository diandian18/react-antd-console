import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import Language from '../Language';
import Avatar from '../Avatar';
import Refresh from '../Refresh';
import Breadcrumb from '../Breadcrumb';
import { Divider } from 'antd';
import Github from '../Github';
import { isFullscreenEnabled } from '../FullScreen/utils';
import FullScreen from '../FullScreen';
import ColorPicker from '../ColorPicker';
import DarkSwitch from '../DarkSwitch';
import { isMobile } from '@/utils/browser';
import './index.less';

interface Props {
  className?: string;
  show?: boolean;
}

const IconWrap = ({ children, className, show = true }: PropsWithChildren<Props>) => {
  if (!show) return null;

  return (
    <div className={classNames('console-layout__header-right-icon-wrap', className)}>
      { children }
    </div>
  );
};

const Header = () => {
  return (
    <header className="console-layout__header">
      {!isMobile && (
        <div className="console-layout__header-left">
          <Breadcrumb />
        </div>
      )}
      <div className="console-layout__header-right">
        <IconWrap>
          <ColorPicker />
        </IconWrap>
        <IconWrap>
          <DarkSwitch />
        </IconWrap>
        <IconWrap>
          <Language />
        </IconWrap>
        <IconWrap>
          <Refresh />
        </IconWrap>
        <IconWrap show={isFullscreenEnabled}>
          <FullScreen />
        </IconWrap>
        <Divider orientation="vertical" />
        <IconWrap>
          <Github />
        </IconWrap>
        <Divider orientation="vertical" />
        <IconWrap>
          <Avatar />
        </IconWrap>
      </div>
    </header>
  );
};

export default Header;
