import React, { useEffect, useRef, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

const NodePanel = ({addNode}) => {
  const nodeRef = useRef([]);
  const [nodeType, setNodeType] = useState()
  const handleDragEnd = (e)=>{
    addNode(e.clientX,e.clientY,nodeType)
  } 
  const nodeList = [
    {
      type: "chat-node",
      name: "Message",
      Icon: BiMessageRoundedDetail,
      color: "#7D239B",
    },
  ];
  useEffect(()=>{
    document.documentElement.addEventListener('dragover',(e)=>{
        e.preventDefault()
        })
  },[])
  return (
    <div className="w-full p-4 grid grid-cols-2 select-none">
      {nodeList.map(({ type, color, Icon, name }, i) => (
        <div
          draggable
          key={i}
          ref={(element) => (nodeRef.current[i] = element)}
          onDragStart={()=>setNodeType(type)}
          onDragEnd={handleDragEnd}
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
