import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const SettingsBar = ({
  setNodes,
  nodes,
  setShowSettingsBar,
  showSettingsBar,
}) => {
    // function to close settings panel and open node panel
  const closeSettings = () => {
    setShowSettingsBar(false);
  };
  // getting the current node for which this panel will act
  const currentNode = nodes.find((node) => {
    return node.id === showSettingsBar;
  });
  
  // initialise textVal state from current node's text
  const [textVal, setTextVal] = useState(currentNode.data.text);
  
  const handleChange = (e) => {
    setTextVal(e.target.value);
  };

// updates the nodeList everytime the text value changes
  useEffect(() => {
    // creates a new list without current node
    const newNodes = nodes.filter((node) => node.id !== showSettingsBar); 

    // updates the state with the updated text node along with the new node list
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

  // updates the text val displayed in text area everytime a new node is clicked
  useEffect(() => {
    setTextVal(currentNode.data.text);
  }, [showSettingsBar]); // new node clicked will update the calue of showSettingBar with its id which triggers use effect

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
          value={textVal} // textValue from the state to be doubly linked
          onChange={handleChange}
          className=" text-black border border-gray-300 w-full mt-4 p-2"
          placeholder="Enter text here"
        ></textarea>
      </div>
    </div>
  );
};

export default SettingsBar;
