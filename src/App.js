import React, {useCallback, useRef, useState } from "react";
import "./App.css";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useViewport,
} from "reactflow";

import "reactflow/dist/style.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import SettingsBar from "./components/SettingsBar";
import NodePanel from "./components/NodePanel";
import { ChatNode } from "./components/nodes/ChatNode";
import SaveError from "./components/SaveError";

const initialNodes = [];
const initialEdges = [];

// Added a nodetype ChatNode custom node
const nodeTypes = {
  "chat-node": ChatNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // State to show save button errors
  const [showError, setShowError] = useState(false);
  // reference for viewport of flow
  const flowRef = useRef();
  const viewPort = useViewport();
  // state to change between node panel and settings panel in sidebar
  const [showSettingsBar, setShowSettingsBar] = useState(false);
  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  // function to check errors while saving ie
  // there should be no disconnected node
  const checkEdges = () => {
    const targetList = edges.map((edge) => edge.target);
    // counter to count number of nodes with epty target handlers
    let count = 0;
    for (let node of nodes) {
      // checking if targetlist does not icludes the current node of the for loop
      if (nodes.length > 1 && !targetList.includes(node.id)) {
        count++;
        // if number of empty target nodes is 2 or more then show error
        if (count > 1){
          //start displaying error
          setShowError(true)
          // stop showing error after 2 seconds
          setTimeout(() => {
            setShowError(false);
          }, 2000);
          return
        }   
      }
    }
    alert('saved no errors')
  };
 // function to add a node at x,y position of cursor and can have different node types as well
  const addNode = (x, y, type) => {
    /* calculating the position of node to be generated on the basis of x,y positions of mouse
      - subtracting the viewport offset to account for vieport dragged
      - subtracting the offSet of the viewport to account for the margins or placement of flow division
      - dividing by zoom to account fo the zoom offset
     */
    const pX = (x - viewPort.x - flowRef.current.offsetLeft) / viewPort.zoom;
    const pY = (y - viewPort.y - flowRef.current.offsetTop) / viewPort.zoom;
    // adding new node to the previous node list
    setNodes([
      ...nodes,
      {
        id: `${Math.random() * nodes.length + 1}`, //creating random id
        type,
        position: { x: pX, y: pY }, // assigned calculated position
        data: { text: ``, setShowSettingsBar, setEdges }, // passing text and setter functions to be used in ecah node 
      },                                                  // for opeing settings panel on click and updating edges state
    ]);
  };

  return (
    <div className=" h-[100vh] flex flex-col">
      <SaveError showError={showError} /> {/* could not save flow error component  */}
      <NavBar checkEdges={checkEdges} />  {/* passing the check edges function to Navbars save button */}
      <div className="w-[100%] h-full flex">
        <ReactFlow
          ref={flowRef}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
        ></ReactFlow>
        <SideBar>
          {showSettingsBar ? (
            <SettingsBar
              setNodes={setNodes}
              nodes={nodes}
              setShowSettingsBar={setShowSettingsBar}
              showSettingsBar={showSettingsBar}
            />
          ) : (
            <NodePanel addNode={addNode} />
          )}
        </SideBar>
      </div>
    </div>
  );
}
