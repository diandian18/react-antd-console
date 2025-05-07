import useStore from '@/layouts/ConsoleLayout/store';
import SvgIcon from '@/components/SvgIcon';
import { motion } from 'framer-motion';
import './index.less';

const Collapse = () => {
  const { collapsed, setCollapsed } = useStore();

  function onClickCollapseMenu() {
    setCollapsed(!collapsed);
  }

  return (
    <motion.span className="console-layout-tabs__collapse"
      whileTap={{ scale: 0.85 }}
      onClick={onClickCollapseMenu}
    >
      <motion.span
        initial={false}
        animate={{ rotateY: collapsed ? 180 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SvgIcon name="menu_unfold" size={12} />
      </motion.span>
    </motion.span>
  );
}

export default Collapse;
