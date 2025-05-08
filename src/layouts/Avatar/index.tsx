import type { MenuProps } from 'antd';
import { Dropdown, Tooltip } from 'antd';
import type { MenuItemType } from 'rc-menu/lib/interface.d';
import router from '@/router';
import { useModel } from '@zhangsai/model';
import { withAuthModel } from '@/models/withAuth';
import { useTranslation } from 'react-i18next';
import './index.less';

/**
 * 头像下拉
 */
const Avatar = () => {
  const userAccount = useModel(withAuthModel, 'userAccount');
  const avatar = useModel(withAuthModel, 'avatar');
  const { t: t_layout } = useTranslation('layout');

  const items: MenuProps['items'] = [{
    key: 'profile',
    label: t_layout('个人中心'),
  }, {
    key: 'logout',
    label: t_layout('退出登录'),
  }];

  function onClickItem(menuInfo: MenuItemType) {
    if (menuInfo.key === 'profile') {
      router.push(`/profile`);
    } else if (menuInfo.key === 'logout') {
      withAuthModel.actionLogout();
    }
  }

  return (
    <Tooltip placement="bottom" title={userAccount}>
      <div className="console-layout__avatar">
        <Dropdown
          menu={{
            items,
            onClick: onClickItem,
          }}
          placement="bottom"
          trigger={['click']}
        >
          <div className="console-layout__avatar-click">
            <span className="console-layout__avatar-image-wrap">
              <img src={avatar || '/images/logo.png'} alt={userAccount} />
            </span>
            <span className="console-layout__name">{ userAccount }</span>
          </div>
        </Dropdown>
      </div>
    </Tooltip>
  );
};

export default Avatar;

