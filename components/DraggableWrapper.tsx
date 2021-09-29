import { FC, Fragment } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

interface Props {
  id: string;
  index: number;
  enableGhost: boolean;
}

const DraggableWrapper: FC<Props> = ({ id, children, index, enableGhost }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Fragment>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              transform: enableGhost
                ? snapshot.isDragging
                  ? provided.draggableProps.style?.transform
                  : "translate(0px, 0px)"
                : provided.draggableProps.style.transform,
            }}
          >
            {children}
          </div>
          {enableGhost
            ? snapshot.isDragging && (
                <div style={{ transform: "none !important" }}>{children}</div>
              )
            : null}
        </Fragment>
      )}
    </Draggable>
  );
};

export default DraggableWrapper;
