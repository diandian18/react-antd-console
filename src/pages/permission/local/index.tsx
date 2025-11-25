import ChangeUser from '../ChangeUser';
import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import { Alert, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import './index.less';

/**
 * 局部权限
 */
const LocalPermission = () => {
  const permissions = useModel(withAuthModel, 'permissions');
  const { t: t_permission } = useTranslation('permission');
  return (
    <div className="console-permission-local">
      <Alert style={{
        marginBottom: 24,
      }} type="warning" showIcon title={t_permission('切换为 Assistant 帐号后，有的按钮会隐藏')} />
      <ChangeUser type="local" />
      <div className="console-permission-local__btn-wrap">
        <span className="console-permission-local__label">{t_permission('只有Admin能看到')}: </span>
        {permissions['permissionLocalBtn2'] && <Button type="dashed">{t_permission('按钮A')}</Button>}
      </div>
      <div className="console-permission-local__btn-wrap">
        <span className="console-permission-local__label">{t_permission('都能看到')}: </span>
        {permissions['permissionLocalBtn1'] && <Button type="dashed">{t_permission('按钮B')}</Button>}
      </div>
    </div>
  );
};

export default LocalPermission;
