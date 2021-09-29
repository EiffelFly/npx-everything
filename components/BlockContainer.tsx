import { Children, FC } from "react";

interface Props {}

const BlockContainer: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-1 border border-gray-700 py-2 px-4 my-2">
      {children}
    </div>
  );
};

export default BlockContainer;
