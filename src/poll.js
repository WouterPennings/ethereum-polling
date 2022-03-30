const { ethers } = require("ethers");

let poll = class {
  constructor(addr, provider) {
    let abi = [
      "constructor()",
      "function vote(bool _vote) external",
      "function voteCount() external view returns(uint)",
      "function currentStandings() external view returns(uint)",
    ];

    this.poll = new ethers.Contract(addr, abi, provider);
  }

  async CurrentStandings() {
    return await this.poll.currentStandings();
  }

  async VoteCount() {
    return await this.poll.voteCount();
  }

  async Vote(signer, vote) {
    try {
      const pollSigner = this.poll.connect(signer);
      await pollSigner.vote(vote);
      return true;
    } catch (err) {
      return false;
    }
  }
};

module.exports = poll;
