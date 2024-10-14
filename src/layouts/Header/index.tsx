import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import Language from '../Language';
import Avatar from '../Avatar';
import Refresh from '../Refresh';
import './index.less';
import Breadcrumb from '../Breadcrumb';

interface Props {
  className?: string;
}

const IconWrap = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div className={classNames('console-layout__header-right-icon-wrap', className)}>
      { children }
    </div>
  );
};

const Header = () => {
  return (
    <header className="console-layout__header">
      <div className="console-layout__header-left">
        <Breadcrumb />
      </div>
      <div className="console-layout__header-right">
        <IconWrap>
          <Language />
        </IconWrap>
        <IconWrap>
          <Refresh />
        </IconWrap>
        <IconWrap>
          <Avatar />
        </IconWrap>
      </div>
    </header>
  );
};

export default Header;
