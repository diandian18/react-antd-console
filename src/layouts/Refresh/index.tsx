import { baseModel } from '@/models/base';
import TooltipIcon from '../components/TooltipIcon';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/components/SvgIcon';
import { motion, useAnimation } from 'framer-motion';

const Refresh = () => {
  const { t: t_layout } = useTranslation('layout');
  const controls = useAnimation();

  return (
    // @ts-expect-error forwardRef is no need any more.
    <TooltipIcon
      title={t_layout('刷新页面')}
      icon={(
        <motion.div
          animate={controls}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SvgIcon name="refresh" size={18} />
        </motion.div>)}
      onClick={() => {
        baseModel.refresh();
        controls.start({
          rotate: [0, 360],
        });
        setTimeout(() => {
          controls.stop();
        }, 300);
      }}
    />
  );
};

export default Refresh;
