import { Button, Tooltip } from 'antd';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { useHover } from 'react-use';
import './index.less';

interface Props {
  title?: string;
  icon: ReactNode;
  onClick?: () => void;
}

const TooltipIcon = (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const { title = '', icon, onClick } = props;
  const [Btn] = useHover((isHovering) =>
    <Button className="console-tooltipIcon__button"
      style={{
        backgroundColor: isHovering ? '#63738122' : '#63738114',
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

export default forwardRef(TooltipIcon);
