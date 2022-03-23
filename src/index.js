const { ethers } = require("ethers");

function CreateThings(signer_addr, contract_addr) {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = provider.getSigner(signer_addr);
    const poll = new ethers.Contract(contract_addr, abi, provider); // Read only things
    const pollSigner = poll.connect(signer); // Write things
    return [provider, signer, poll, pollSigner];
}

let abi = [
    "constructor()",
    "function vote(bool _vote) external",
    "function voteCount() external view returns(uint)",
    "function currentStandings() external view returns(uint)"
];



// Following: https://docs.ethers.io/v5/single-page/#/v5/getting-started/
const [provider, signer, poll, pollSigner] = CreateThings("0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

async function BlockCount() {
    console.log("Blockchain: " + await provider.getBlockNumber());
}

async function PollCurrentStandings() {
    let res = await pollSigner.currentStandings();
    console.log("Current standings: " + res);
}

async function PollVoteCount() {
    let res = await pollSigner.voteCount();
    console.log("Poll Vote Count: " + res);
}

async function PollVote(vote) {
    try {
        await pollSigner.vote(vote);
        console.log("Voting successfull");
    }
    catch (err) {
        console.log("Voting error occured");
    }
}
    
BlockCount();
PollVote(false);
PollVoteCount();
PollCurrentStandings();