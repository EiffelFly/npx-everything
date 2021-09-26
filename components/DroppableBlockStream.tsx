import { FC } from "react";
import { Droppable } from 'react-beautiful-dnd';

interface Props {}

const DroppableBlockStream: FC<Props> = () => {
  return (
    <Droppable droppableId="droppable-block-stream">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          Hi I am droppable
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DroppableBlockStream