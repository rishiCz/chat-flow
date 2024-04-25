import React from "react";
import { Handle, Position, useEdges } from "reactflow";
import { BiMessageRoundedDetail } from "react-icons/bi";

export function ChatNode({ id, data }) {
  const { setShowSettingsBar, text, setEdges } = data; // passing props through the data object of node
  const edges = useEdges();

  // function to remove source handler connection if it exists
  // thi will ensure only one source handler originating
  const removeConnection = () => {
    if (!isValidConnection()) {
      const newEdges = edges.filter((edge) => edge.source !== id);
      setEdges(newEdges);
    }
  };
 // function to check if current node's source handler is already connected
  const isValidConnection = () => {
    if (edges.find((edge) => edge.source === id)) return false;
    return true;
  };

  return (
    <div
      onClick={() => {
        setShowSettingsBar(id); // clicking on the node will open settings panel with this node's id
      }}
      className="rounded-lg overflow-hidden w-[250px] shadow-lg cursor-pointer"
    >
      <div className=" px-2 items-center gap-2 bg-[#B2F0E3] w-full flex rounded-t-lg">
        <BiMessageRoundedDetail />
        <p className=" font-bold">Send Message</p>
      </div>
      <div className="p-3 bg-white">
        {text || <p className=" text-gray-400">Enter Message</p>}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        onMouseDown={removeConnection} // whenever you click or drag on source handler it will remove previous edge
      />
      <Handle
        type="target"
        position={Position.Left}
        isValidConnection={() => false} // made it so that the target cannot link to source only source can link to target
      />
    </div>
  );
}
