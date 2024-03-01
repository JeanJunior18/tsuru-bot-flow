export default function setConnections(links, res) {
  const usedIds = new Set();

  for (let i = 0; i < res.data.results.length; i++) {
    const b = res.data.results[i];
    for (let k = 0; k < b.messages.length; k++) {
      const m = b.messages[k];
      for (let j = 0; j < m.options.length; j++) {
        const op = m.options[j];

        const connectionId = `link${b.id}-${op.id}-${op.jump_to}`;

        if (!usedIds.has(connectionId)) {
          links.push({
            id: connectionId,
            source: `${b.id}`,
            target: `${op.jump_to}`,
            type: "bezier",
            label: op.option,
          });
          usedIds.add(connectionId);
        }
      }
    }
  }

  return links;
}
