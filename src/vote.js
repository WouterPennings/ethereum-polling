let vote = class {
  constructor() {}

  async BlockCount(provider) {
    console.log("Blockchain: " + (await provider.getBlockNumber()));
  }

  async PollCurrentStandings(pollSigner) {
    let res = await pollSigner.currentStandings();
    console.log("Current standings: " + res);
  }

  async PollVoteCount(pollSigner) {
    let res = await pollSigner.voteCount();
    console.log("Poll Vote Count: " + res);
  }

  async PollVote(pollSigner, vote) {
    try {
      await pollSigner.vote(vote);
      console.log("Voting successfully");
    } catch (err) {
      console.log("Voting error occurred");
    }
  }
};

module.exports = vote;
