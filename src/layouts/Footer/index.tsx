import SvgIcon from '@/components/SvgIcon';
import './index.less';

const Footer = () => {
  return (
    <footer className="console-layout__right-footer">
      Copyright <SvgIcon name="copyright" /> {new Date().getFullYear()} react-antd-console
    </footer>
  );
};

export default Footer;
