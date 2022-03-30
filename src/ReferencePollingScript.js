const { ethers } = require("ethers");
const Poll = require("./poll.js");

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const p = new Poll("0x5FbDB2315678afecb367f032d93F642f64180aa3", provider);
const signer = provider.getSigner("0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f");

p.Vote(signer, false).then((value) => console.log("Successfully voted:" + value));
p.VoteCount().then((value) => console.log("Vote count:" + value));
p.CurrentStandings().then((value) => console.log("Current standing: " + value));
