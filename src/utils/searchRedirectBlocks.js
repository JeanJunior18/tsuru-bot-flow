export default function searchRedirectBlocks(redirectBlocks, block, blocks) {
  const ids = [];
  block.messages.forEach((m) => {
    if (m.next_block) {
      ids.push(m.next_block);
    } else {
      m.options.forEach((op) => {
        if (op.jump_to) {
          ids.push(op.jump_to);
        }
      });
    }
  });

  redirectBlocks = ids.map((id) => blocks.find((b) => b.id === id));
  return redirectBlocks;
}
