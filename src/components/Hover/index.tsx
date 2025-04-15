import { useHover } from 'react-use';
import type { JSX } from "react";

type Props = {
  children: ((isHovering: boolean) => JSX.Element);
}

const Hover = (props: Props) => {
  const hoverChildren = useHover((isHovering: boolean) => {
    return props.children(isHovering);
  });
  return hoverChildren;
};

export default Hover;
