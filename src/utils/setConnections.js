export default function setConnections(res) {
  const usedIds = new Set();
  const links = []
  for(const block of res.data.results) {
    for(const message of block.messages) {
      for(const option of message.options) {
        const connectionId = `e${message.id}-${option.jump_to}`;
        if (!usedIds.has(connectionId) && message.id && option.jump_to) {
          links.push({
            id: connectionId,
            source: `${message.id}`,
            target: `${option.jump_to}`,
            animated: true
          });
          usedIds.add(connectionId);
        }
      }
    }
  }

  return links;
}
