import TooltipIcon from '../components/TooltipIcon';
import SvgIcon from '@/components/SvgIcon';

const Github = () => {
  return (
    <TooltipIcon
      title="Github"
      icon={<SvgIcon name="github" size={20} />}
      onClick={() => {
        window.open('https://github.com/diandian18/react-antd-console');
      }}
    />
  );
};

export default Github;
