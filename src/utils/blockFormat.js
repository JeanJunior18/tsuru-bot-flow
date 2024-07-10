
export default function blockFormat(x, y, block) {
  return {
    id: `${block.id}`,
    position: { x, y },
    data: {
      block,
    },
    type: "block",
    sourcePosition: "bottom",
    targetPosition: "left",
    isConnectable: true,
  };
}
