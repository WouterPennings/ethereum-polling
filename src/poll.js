const { ethers } = require("ethers");

let poll = class {
  constructor(contract_address, provider) {
    let abi = [
      "constructor()",
      "function vote(bool _vote) external",
      "function voteCount() external view returns(uint)",
      "function currentStandings() external view returns(uint)",
    ];

    this.poll = new ethers.Contract(contract_address, abi, provider);
  }

  async PollCurrentStandings() {
    return await this.poll.currentStandings();
  }

  async PollVoteCount() {
    return await this.poll.voteCount();
  }

  async PollVote(public_key, vote) {
    try {
      const pollSigner = this.poll.getSigner(public_key);
      await pollSigner.vote(vote);
      return true;
    } catch (err) {
      return false;
    }
  }
};

module.exports = poll;
