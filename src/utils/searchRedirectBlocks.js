export default function searchRedirectBlocks(redirectBlocks, block, res) {
  block.messages.map((m) =>
    m.options.map((op) => {
      redirectBlocks = [
        ...redirectBlocks,
        res.data.results.find((b) => b.id === op.jump_to),
      ];
    })
  );
  return redirectBlocks;
}
