let BlockCount = class {
  constructor(provider) {
    this.provider = provider;
  }

  async NumberOfBlocks() {
    return await this.provider.getBlockNumber();
  }
};

module.exports = BlockCount;
