const { ethers } = require("ethers");
const Poll = require("./poll.js");

const BlockCount = require("../scripts/count-blocks");
const provider = new ethers.providers.JsonRpcProvider();
const poll = new Poll("0x5FbDB2315678afecb367f032d93F642f64180aa3", provider);
BlockCount(provider);

poll.PollVote("0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc", false);
poll.PollVoteCount();
poll.PollCurrentStandings();
