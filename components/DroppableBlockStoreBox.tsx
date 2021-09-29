import { FC } from "react";
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

interface Props {
  className?: string;
}

const DroppableBlockStoreBox: FC<Props> = ({ children, className }) => {
  return (
    <Droppable droppableId="block-store-box" isDropDisabled={true}>
      {(provided: DroppableProvided) => (
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