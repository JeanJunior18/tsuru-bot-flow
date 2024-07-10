import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import "reactflow/dist/style.css";
import setConnections from "./utils/setConnections";
import setBlocks from "./utils/setBlocks";
import NodeLabel from "./NodeLabel";

const nodeTypes = { block: NodeLabel }

export default function Flow() {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const organizationId = Number(queryParams.get("organization"));
  const token = queryParams.get("token");


  useEffect(() => {
    axios
      .get(`https://blubots.com/api/v2/bot/blocks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          organization_id: organizationId,
        },
      })
      .then((res) => {
        setNodes(setBlocks(res));
        setEdges(setConnections(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [organizationId, token, setEdges, setNodes]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background variant={BackgroundVariant.Dots} >
          <Controls />
          <MiniMap />
        </Background>
      </ReactFlow>
    </div>
  );
}
