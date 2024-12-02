import { useModel } from '@zhangsai/model';
import { baseModel } from '@/models/base';
import { Dropdown } from 'antd';
import { message } from '@/components/AntdProvider';
import type { MenuItemType } from 'rc-menu/lib/interface.d';
import { useTranslation } from 'react-i18next';
import TooltipIcon from '../components/TooltipIcon';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

const items = [{
  key: 'zh_Hans',
  label: '简体中文',
}, {
  key: 'en',
  label: 'English',
}];

/**
 * 切换语言按钮
 */
const Language = () => {
  const language = useModel(baseModel, 'language');
  const { t: t_layout } = useTranslation('layout');

  function onClickChangeLanguage(menuInfo: MenuItemType) {
    baseModel.setLanguage(menuInfo.key as string);
    message.success(t_layout('切换语言成功', { language: items.find(item => item?.key === menuInfo.key)?.label }));
  }

  return (
    <TooltipIcon
      title={t_layout('语言')}
      icon={(
        <Dropdown
          className="console-layout-language__dropdown"
          menu={{
            items,
            onClick: onClickChangeLanguage,
            selectable: true,
            defaultSelectedKeys: [language],
          }}
          placement="bottom"
          trigger={['click']}
        >
          <div>
            <SvgIcon name="language" size={20} />
          </div>
        </Dropdown>
      )}
    />
  );
};

export default Language;

