import { Button } from 'antd';
import router from '@/router';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

/**
 * 403页
 */
const NoAccess = () => {
  const { t: t_error } = useTranslation('error');
  return (
    <div className="no-access">
      <div className="no-access__content">
        <p><SvgIcon name="forbidden" size={70} color="#333" /></p>
        <p className="no-access__tips">{t_error('对不起，您没有访问权限')}</p>
        <Button onClick={() => router.push('/home')}>{t_error('回到主页')}</Button>
      </div>
    </div>
  );
};

export default NoAccess;
