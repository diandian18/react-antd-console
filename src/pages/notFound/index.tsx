import { Button } from 'antd';
import router from '@/router';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

/**
 * 404页
 */
const NotFound = () => {
  const { t: t_error } = useTranslation('error');
  
  return (
    <div className="not-found">
      <div className="not-found__content">
        <p><SvgIcon name="not_found" size={70} color="#333" /></p>
        <p className="not-found__tips">{t_error('对不起，您访问的页面不存在')}</p>
        <Button onClick={() => router.push(`/home`)}>{t_error('回到主页')}</Button>
      </div>
    </div>
  );
};

export default NotFound;
