import { Button, Tooltip } from 'antd';
import { forwardRef, ReactNode, Ref } from 'react';
import { useHover } from 'react-use';
import { useModel } from '@zhangsai/model';
import { themeModel } from '@/models/theme';
import './index.less';

const themeColor = {
  light: {
    textColor: 'rgba(0, 0, 0, 0.76)',
    backgroundColor: '#63738114',
    hoverBackgroundColor: '#63738122',
  },
  dark: {
    textColor: '',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    hoverBackgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
};

interface Props {
  title?: string;
  icon: ReactNode;
  onClick?: () => void;
}

const TooltipIcon = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const { title = '', icon, onClick } = props;
  const curDarkMode = useModel(themeModel, 'curDarkMode');
  const themeName = curDarkMode ? 'dark' : 'light';
  const [Btn] = useHover((isHovering) =>
    <Button className="console-tooltipIcon__button"
      style={{
        color: themeColor[themeName].textColor,
        backgroundColor: isHovering ? themeColor[themeName].hoverBackgroundColor : themeColor[themeName].backgroundColor,
      }}
      ref={ref}
      type="text"
      icon={icon}
      onClick={onClick}
      aria-label="tooptip"
    />,
  );
  return (
    <Tooltip placement="bottom" title={title}>
      { Btn }
    </Tooltip>
  );
};

export default forwardRef(TooltipIcon); // 去掉forwardRef会有bug
