import { FC, useState } from "react";
import {
  DragDropContext,
  resetServerContext,
  DropResult,
} from "react-beautiful-dnd";
import DraggableWrapper from "../components/DraggableWrapper";
import DroppableBlockStoreBox from "../components/DroppableBlockStoreBox";
import DroppableBlockStream from "../components/DroppableBlockStream";
import { GetServerSideProps } from "next";
import { v4 as uuidv4 } from "uuid";

interface Props {}

interface DndDropResultDestination {
  droppableId: string;
  index: number;
}

interface DndDropResultSource {
  droppableId: string;
  index: number;
}

const initialData = {
  blocks: {
    initial: {
      githubClone: {
        id: "githubClone",
        content: "clone this github",
      },
      npxScript: {
        id: "npxScript",
        content: "Execute this script",
      },
    },
    customize: {},
  },
  droppables: {
    "block-store-box": {
      id: "block-store-box",
      title: "Storebox",
      taskIDs: ["githubClone", "npxScript"],
    },
    "block-stream": {
      id: "block-stream",
      title: "Stream",
      taskIDs: [],
    },
  },
};

const App: FC<Props> = () => {
  const [items, setItems] = useState(initialData);

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

    const blockID = items.droppables["block-store-box"].taskIDs[source.index];

    const [newOrder, newID] = copy(
      items.droppables[source.droppableId].taskIDs,
      items.droppables[destination.droppableId].taskIDs,
      source,
      destination
    );

    console.log(newOrder);

    let newItems = {
      blocks: {
        initial: { ...items.blocks.initial },
        customize: { ...items.blocks.customize },
      },
      droppables: {
        "block-store-box": { ...items.droppables["block-store-box"] },
        "block-stream": {
          id: "block-stream",
          title: "Stream",
          taskIDs: newOrder,
        },
      },
    };

    newItems.blocks.customize[newID] = {
      id: newID,
      content: items.blocks.initial[blockID].content,
    };

    setItems(newItems);

    console.log(newItems);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="flex flex-row gap-x-4">
          <DroppableBlockStoreBox
            className={"flex flex-col w-96 border border-gray-700"}
          >
            {items.droppables["block-store-box"].taskIDs.map((id, index) => (
              <DraggableWrapper id={id} index={index} key={id}>
                {items.blocks.initial[id].content}
              </DraggableWrapper>
            ))}
          </DroppableBlockStoreBox>
          <DroppableBlockStream className={"w-96 border border-gray-700"}>
            {items.droppables["block-stream"].taskIDs.map((id, index) => (
              <DraggableWrapper id={id} index={index} key={id}>
                {items.blocks.customize[id].content}
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
  source: any[],
  destination: any[],
  droppableSource: DndDropResultSource,
  droppableDestination: DndDropResultDestination
) => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  let item = sourceClone[droppableSource.index];
  const newID = uuidv4();
  item = item + "-" + newID;

  destClone.splice(droppableDestination.index, 0, item);
  return [destClone, item];
};
