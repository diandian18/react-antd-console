import { exitFullscreen, requestFullscreen, isFullscreenEnabled } from './utils';
import TooltipIcon from '../components/TooltipIcon';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { useFullScreen } from './hooks';

interface Props {
  element?: Element | string;
}

const FullScreen: React.FC<Props> = ({
  element = document.documentElement,
}) => {
  const isFullScreen = useFullScreen();
  const { t: t_layout } = useTranslation('layout');

  if (!isFullscreenEnabled) return null;

  if (!isFullScreen) {
    return (
      <TooltipIcon
        title={t_layout('全屏')}
        icon={<SvgIcon name="fullscreen" size={18} />}
        onClick={() => requestFullscreen(element)}
      />
    );
  } else {
    return (
      <TooltipIcon
        title={t_layout('退出全屏')}
        icon={<SvgIcon name="fullscreen_exit" size={18} />}
        onClick={() => exitFullscreen()}
      />
    );
  }
};

export default FullScreen;
