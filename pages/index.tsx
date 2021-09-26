import { FC } from "react";
import {
  DragDropContext,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import DraggableWrapper from "../components/DraggableWrapper";
import DroppableBlockStoreBox from "../components/DroppableBlockStoreBox";
import DroppableBlockStream from "../components/DroppableBlockStream";
import { GetServerSideProps } from "next";

interface Props {}

interface DndDropResultDestination {
  droppableId: string;
  index: number;
}

interface DndDropResultSource {
  draggableId: string;
  index: number;
}

const initialData = {
  tasks: {
    githubClone: {
      id: "githubClone",
      content: "clone this github",
    },
    npxScript: {
      id: "npxScript",
      content: "Execute this script",
    },
  },
  droppables: {
    blockStoreBox: {
      id: "block-store-box",
      title: "Storebox",
      taskIDs: ["githubClone", "npxScript"],
    },
    blockStream: {
      id: "block-stream",
      title: "Stream",
      taskIDs: [],
    },
  },
};

const App: FC<Props> = () => {
  const onDragEndHandler = (result: DropResult) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // We don't want item in store box to be dragged
    if (
      destination.droppableId === "droppable-block-store-box" &&
      source.droppableId === "droppable-block-store-box"
    ) {
      return;
    }

    // We don't want item drop back into store box
    if (destination.droppableId === "droppable-block-store-box") {
      return;
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="flex flex-row">
          <DroppableBlockStoreBox
            className={"flex flex-col w-96 border border-gray-700"}
          >
            {initialData.droppables.blockStoreBox.taskIDs.map((id, index) => (
              <DraggableWrapper id={id} index={index} key={id}>
                {initialData.tasks[id].content}
              </DraggableWrapper>
            ))}
          </DroppableBlockStoreBox>
          <DroppableBlockStream className={"w-96 border border-gray-700"}>
            {initialData.droppables.blockStream.taskIDs.map((id, index) => (
              <DraggableWrapper id={id} index={index} key={id}>
                {initialData.tasks[id].content}
              </DraggableWrapper>
            ))}
          </DroppableBlockStream>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext();
  return { props: {} };
};

const reorder = (list: [], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const copy = (
  source: string[],
  destination: string[],
  droppableSource: DndDropResultSource,
  droppableDestination: DndDropResultDestination
) => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, item);
  return destClone;
};
