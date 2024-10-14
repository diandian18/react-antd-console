import { baseModel } from '@/models/base';
import TooltipIcon from '../components/TooltipIcon';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';

const Refresh = () => {
  const { t: t_layout } = useTranslation('layout');

  return (
    <TooltipIcon
      title={t_layout('刷新页面')}
      icon={<SvgIcon name="refresh" size={18} />}
      onClick={() => {
        baseModel.refresh();
      }}
    />
  );
};

export default Refresh;
