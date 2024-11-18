import { Space } from 'antd';
import DarkSwitch from '@/layouts/DarkSwitch';
import Language from '@/layouts/Language';
import FullScreen from '@/layouts/FullScreen';
import Refresh from '@/layouts/Refresh';
import ColorPicker from '@/layouts/ColorPicker';

const Tools = () => {
  return (
    <div className="console-login__tools">
      <Space size="small">
        <ColorPicker />
        <DarkSwitch />
        <Language />
        <FullScreen />
        <Refresh />
      </Space>
    </div>
  );
};

export default Tools;
