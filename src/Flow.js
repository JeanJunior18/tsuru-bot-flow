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
} from "reactflow";

import "reactflow/dist/style.css";
import setConnections from "./utils/setConnections";
import setBlocks from "./utils/setBlocks";

const initialNodes = [];
const initialEdges = [];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const organizationId = Number(queryParams.get("organization"));
  const token = queryParams.get("token");
  let links = [];
  let blocks = [];

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
        blocks = setBlocks(blocks, res);
        links = setConnections(links, res);
        setNodes(blocks);
        setEdges(links);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={{ Background: "red" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        {/* <Background variant="dots" gap={12} size={1} /> */}
      </ReactFlow>
    </div>
  );
}
