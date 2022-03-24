const { ethers } = require("ethers");

let poll = class {
  constructor(contract_address, provider, abi) {
    this.poll = new ethers.Contract(contract_address, abi, provider);
  }

  async PollCurrentStandings() {
    return await poll.currentStandings();
  }

  async PollVoteCount() {
    return await poll.voteCount();
  }

  async PollVote(pollSigner, vote) {
    try {
      await pollSigner.vote(vote);
      return true;
    } catch (err) {
      return false;
    }
  }
};

module.exports = poll;
