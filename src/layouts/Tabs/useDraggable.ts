import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}

const useDraggable = ({ ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: props['data-node-key'],
      transition: null,
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, y: 0, scaleX: 1 }),
    transition: isDragging ? 'none' : transition,
    cursor: isDragging ? 'grabbing' : 'default',
    zIndex: isDragging ? 2 : 1,
  };

  return {
    draggableProps: {
      key: props['data-node-key'],
      ref: setNodeRef,
      style,
      ...attributes,
      ...listeners,
    },
    isDragging,
  };
};

export default useDraggable;
