import { motion } from 'framer-motion';
import SvgIcon from '@/components/SvgIcon';
import './index.less';

const Loading = () => {
  return (
    <div className="console-loading">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ type: 'tween', ease: 'linear', duration: 1, repeat: Infinity }}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SvgIcon name="loading" size={48} />
      </motion.div>
    </div>
  );
};

export default Loading;
