import classNames from 'classnames';
import { CSSProperties, SVGAttributes } from 'react';

const DEFAULT_SIZE = 16;

export interface Props<T> extends SVGAttributes<T> {
  className?: string;
  style?: CSSProperties;
  prefix?: string;
  /** [dir]-[name] */
  name: string;
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

/**
 * SVG组件:
 * svg文件在 src/assets/svg/ 里.
 * name值对应 src/assets/svg/ 里的 文件夹名-文件名
 */
const SvgIcon: React.FC<Props<SVGSVGElement>> = ({
  className,
  style,
  name,
  prefix = 'icon',
  color,
  size,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  ...props
}) => {
  /** createSvgIconsPlugin: symbolId -> '[prefix]-[dir]-[name]', */
  const symbolId = `#${prefix}-${name}`;
  const {
    width: _width,
    height: _height,
  } = size ?
    { width: size ?? DEFAULT_SIZE, height: size ?? DEFAULT_SIZE, } :
    { width, height }

  return (
    <svg
      className={classNames('svg-icon', className)}
      aria-hidden="true"
      width={_width}
      height={_height}
      color={color}
      style={style}
      {...props}
    >
      <use href={symbolId} fill="currentColor" />
    </svg>
  )
};

export default SvgIcon;
