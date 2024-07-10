export default function setConnections(res) {
  const usedIds = new Set();
  const links = []
  for (let i = 0; i < res.data.results.length; i++) {
    const b = res.data.results[i];
    for (let k = 0; k < b.messages.length; k++) {
      const m = b.messages[k];
      for (let j = 0; j < m.options.length; j++) {
        const op = m.options[j];

        const connectionId = `e${b.id}-${op.jump_to}`;

        if (!usedIds.has(connectionId) && b.id && op.jump_to) {
          links.push({
            id: connectionId,
            source: `${b.id}`,
            target: `${op.jump_to}`,
            animated: true
          });
          usedIds.add(connectionId);
        }
      }
    }
  }

  return links;
}
