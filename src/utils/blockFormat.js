import NodeLabel from "../NodeLabel";

export default function blockFormat(x, y, block) {
  return {
    id: `${block.id}`,
    position: { x, y },
    data: {
      label: <NodeLabel block={block} />,
    },
    sourcePosition: "bottom",
    targetPosition: "left",
    isConnectable: false,
  };
}
