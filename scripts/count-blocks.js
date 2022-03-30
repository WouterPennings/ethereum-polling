let BlockCount = class {
  constructor(provider) {
    this.provider = provider;
  }

  async NumberOfBlocks(provider) {
    return await provider.getBlockNumber();
  }
};

module.exports = BlockCount;
