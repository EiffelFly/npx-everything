import { FC } from "react";
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  className?: string;
}

const DroppableBlockStream: FC<Props> = ({ children, className }) => {
  return (
    <Droppable droppableId="block-stream">
      {(provided) => (
        <div
          className={className || ""} 
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DroppableBlockStream