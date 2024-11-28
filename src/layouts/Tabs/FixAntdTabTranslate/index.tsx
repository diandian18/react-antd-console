import { JSXElementConstructor, PropsWithChildren, ReactElement } from 'react';
import './index.less';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: ReactElement<any, string | JSXElementConstructor<any>>;
}

/**
 * 自定义tab的包裹容器
 * 用于继承antd tab的位移定位功能
 */
const FixAntdTabTranslate = ({ node, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      {children}
      <span className="console-layout-fix-antd-tab-translate">
        {node}
      </span>
    </div>
  );
};

export default FixAntdTabTranslate;
