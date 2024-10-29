import ChangeUser from '../ChangeUser';
import { useTranslation } from 'react-i18next';
import { Alert } from 'antd';

/**
 * 路由权限
 */
const RoutePermission = () => {
  const { t: t_permission } = useTranslation('permission');
  return (
    <div className="console-permission-route">
      <Alert style={{
        marginBottom: 24,
      }} type="warning" message={t_permission('切换为 assistant 帐号后，会跳转到403页，因为 assistant 帐号没有本路由权限')} />
      <ChangeUser />
    </div>
  );
};

export default RoutePermission;
