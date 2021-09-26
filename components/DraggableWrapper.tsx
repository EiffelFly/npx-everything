import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  id: string;
  index: number;
}

const DraggableWrapper: FC<Props> = ({ id, children, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableWrapper;
