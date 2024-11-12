import { themeModel } from '@/models/theme';
import { useModel } from '@zhangsai/model';
import TooltipIcon from '../components/TooltipIcon';
import SvgIcon from '@/components/SvgIcon';
import { useTranslation } from 'react-i18next';

const DarkSwitch = () => {
  const curDarkMode = useModel(themeModel, 'curDarkMode');
  const { t: t_layout } = useTranslation('layout');
  return (
    <TooltipIcon
      title={curDarkMode ? t_layout('亮色') : t_layout('暗色')}
      icon={curDarkMode ? <SvgIcon name="theme_light" size={18} /> : <SvgIcon name="theme_dark" size={18} />}
      onClick={() => {
        themeModel.setThemeState({ curDarkMode: !curDarkMode });
      }}
    />
  );
};

export default DarkSwitch;
