import blockFormat from "./blockFormat";
import searchRedirectBlocks from "./searchRedirectBlocks";

export default function setBlocks(res) {
  const blocks = []
  function processBlocks(block, x, y) {
    if (res.data.results.length === blocks.length) {
      return;
    }

    const formattedBlock = blockFormat(x, y, block);
    blocks.push(formattedBlock);

    const redirectBlocks = searchRedirectBlocks([], block, res.data.results);
    if (redirectBlocks.length > 0) {
      let nextY = y;
      redirectBlocks.forEach((redirectedBlock) => {
        if (!blocks.some((b) => b.id === `${redirectedBlock.id}`)) {
          processBlocks(redirectedBlock, x + 900, nextY);
          const redirects = searchRedirectBlocks(
            [],
            redirectedBlock,
            res.data.results
          ).length;
          if (redirects) {
            nextY += 600 * redirects;
          } else {
            nextY += 600;
          }
        }
      });
    }
  }

  if (res.data.results.length) {
    const block = res.data.results[0];
    processBlocks(block, 0, 0);
  }

  return blocks;
}
