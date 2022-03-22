let abi = [
    "constructor()",
    "function vote(bool _vote) external",
    "function voteCount() external view returns(uint)",
    "function currentStandings() external view returns(uint)"
];

// Following: https://docs.ethers.io/v5/single-page/#/v5/getting-started/
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const erc20 = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", abi, provider);

async function BlockCount() {
    console.log(await provider.getBlockNumber());
}

// Also converts hex to dec
async function Balance(addres) {
    let bal = await provider.getBalance(addres);
    console.log(ethers.utils.formatEther(bal));
}

async function PollCurrentStandings() {
    console.log(await erc20.currentStandings());
}

BlockCount();
Balance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
PollCurrentStandings();