import blockFormat from "./blockFormat";
import searchRedirectBlocks from "./searchRedirectBlocks";

export default function setBlocks(blocks, res) {
  function processBlocks(block, x, y) {
    const formattedBlock = blockFormat(x, y, block);
    blocks.push(formattedBlock);

    const redirectBlocks = searchRedirectBlocks([], block, res);
    if (redirectBlocks.length > 0) {
      let nextY = y;
      redirectBlocks.forEach((redirectedBlock, index) => {
        processBlocks(redirectedBlock, x + 550, nextY);
        const redirects = searchRedirectBlocks([], redirectedBlock, res).length;
        if (redirects) {
          nextY += 400 * redirects;
        } else {
          nextY += 400;
        }
      });
    }
  }

  if (res.data.results.length) {
    const block = res.data.results[0];
    processBlocks(block, 10, 10);
  }

  return blocks;
}
