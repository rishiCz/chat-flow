import React, { useEffect, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

// Tried to make the node panel extensible to add different type of nodes in future
const NodePanel = ({addNode}) => {
// nodelist having different node types (currently only 1)
  const nodeList = [
    {
      type: "chat-node",
      name: "Message",
      Icon: BiMessageRoundedDetail,
      color: "#7D239B",
    },
  ];

  // state that selects a node from the nodeList above
  const [nodeType, setNodeType] = useState()

  // function that runs when a node is released after dragging on viewwport
  // this creates a new node on the viewport at cursor position with a specific node type
  const handleDragEnd = (e)=>{
    addNode(e.clientX,e.clientY,nodeType) // sending the mouse position and the selected node type to addNode
  } 

  // function runs only once to prevent the block cursor icon from appearing
  // not necessary but better for UI
  useEffect(()=>{
    document.documentElement.addEventListener('dragover',(e)=>{
        e.preventDefault()
        })
  },[])

  return (
    <div className="w-full p-4 grid grid-cols-2 select-none">
      {/* Creating a node div for every node in nodelist */}
      {nodeList.map(({ type, color, Icon, name }, i) => (
        <div
          draggable
          key={i}
          onDragStart={()=>setNodeType(type)} // at the very start of drag it will update the node type to current node
          onDragEnd={handleDragEnd} // at the end of drrag it will add a node to the view port
          className=" cursor-pointer flex flex-col border-2 items-center gap-1 p-4 w-full"
          style={{ borderColor: color }}
        >
          <Icon color={color} size={30} />
          <label style={{ color: color }}>{name}</label>
        </div>
      ))}
    </div>
  );
};

export default NodePanel;
