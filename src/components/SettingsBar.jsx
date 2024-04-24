import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const SettingsBar = ({
  setNodes,
  nodes,
  setShowSettingsBar,
  showSettingsBar,
}) => {
  const closeSettings = () => {
    setShowSettingsBar(false);
  };
  const currentNode = nodes.find((node) => {
    return node.id === showSettingsBar;
  });
  
  const [textVal, setTextVal] = useState(currentNode.data.text);
  
  const handleChange = (e) => {
    setTextVal(e.target.value);
  };

  useEffect(() => {
    setTextVal(currentNode.data.text);
  }, [showSettingsBar]);

  useEffect(() => {
    const newNodes = nodes.filter((node) => node.id !== showSettingsBar);
    setNodes([
      ...newNodes,
      {
        ...currentNode,
        data: {
          ...currentNode.data,
          text: textVal,
        },
      },
    ]);
  }, [textVal]);
  return (
    <div className="w-full">
      <div className=" p-2 border-b-2 flex border-gray-300">
        <button onClick={closeSettings}>
          <IoMdArrowBack />
        </button>
        <div className="w-full text-center"> Message </div>
      </div>
      <div className="p-5 text-gray-400">
        <div>Text</div>
        <textarea
          value={textVal}
          onChange={handleChange}
          className=" text-black border border-gray-300 w-full mt-4 p-2"
          placeholder="Enter text here"
        ></textarea>
      </div>
    </div>
  );
};

export default SettingsBar;
