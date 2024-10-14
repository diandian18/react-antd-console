import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';
import { Space, Dropdown, Button } from 'antd';
import { MenuItemType } from 'antd/lib/menu/interface';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import SvgIcon from '@/components/SvgIcon';

const items = [{
  key: 'zh_Hans',
  label: '简体中文',
}, {
  key: 'en',
  label: 'English',
}];

const Tools = () => {
  const language = useModel(baseModel, 'language');
  const { t: t_login } = useTranslation('login');

  function onClickChangeLanguage(menuInfo: MenuItemType) {
    baseModel.setLanguage(menuInfo.key as string);
    message.success(t_login('切换语言成功', { language: items.find(item => item?.key === menuInfo.key)?.label }));
  }

  return (
    <div className="console-login__tools">
      <Space size="middle">
        <Dropdown
          className="console-login__language"
          menu={{
            items,
            onClick: onClickChangeLanguage,
            selectable: true,
            defaultSelectedKeys: [language],
          }}
          arrow
          placement="bottom"
          trigger={['click']}
        >
          <Button size="small"><SvgIcon name="language" size={18} /></Button>
        </Dropdown>
      </Space>
    </div>
  );
};

export default Tools;
