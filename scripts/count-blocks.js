async function BlockCount(provider) {
  return await provider.getBlockNumber();
}

module.exports = BlockCount;
