import SvgIcon from '@/components/SvgIcon';
import './index.less';

const PoweredBy = () => {
  return (
    <span className="console-layout-powered-by">
      <SvgIcon name="powered_by" width={72} height={22} />&nbsp;<a href="https://github.com/diandian18/admin-search-list" target="_blank" rel="noreferrer">admin-search-list</a>
    </span>
  );
}

export default PoweredBy;
