import { FC } from "react";
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  className?: string;
}

const DroppableBlockStoreBox: FC<Props> = ({ children, className }) => {
  return (
    <Droppable droppableId="block-store-box">
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

export default DroppableBlockStoreBox