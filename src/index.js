const { ethers } = require("ethers");

function CreateThings(signer_addr, contract_addr) {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = provider.getSigner(signer_addr);
    const poll = new ethers.Contract(contract_addr, abi, provider);
    const pollSigner = poll.connect(signer);
    return [provider, signer, poll, pollSigner];
}

let abi = [
    "constructor()",
    "function vote(bool _vote) external",
    "function voteCount() external view returns(uint)",
    "function currentStandings() external view returns(uint)"
];

// Following: https://docs.ethers.io/v5/single-page/#/v5/getting-started/
const [provider, signer, poll, pollSigner] = CreateThings("0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

async function BlockCount() {
    console.log("Blockchain: " + await provider.getBlockNumber());
}

// Also converts hex to dec
async function Balance(addres) {
    let bal = await provider.getBalance(addres);
    console.log("Balance: " + ethers.utils.formatEther(bal));
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
//Balance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
PollVote(true);
PollVoteCount();
//PollCurrentStandings();