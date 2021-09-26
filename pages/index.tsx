import { FC } from "react";
import { DragDropContext } from "react-beautiful-dnd";
interface Props {}

const App: FC<Props> = () => {
  const onDragEndHandler = () => {};

  return (
    <div>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div></div>
      </DragDropContext>
    </div>
  );
};

export default App;
