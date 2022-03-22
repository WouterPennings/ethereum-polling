# To run
1. `npm install` 
2. `npm run deploy-node`
3. `npm run deploy-sm`
4. `npm run start`

# Poll.sol ABI

When using `ether.js` you need to give the ABI from the contract as a parameter, the ABI of the contract is below:
```
let abi = [
    "constructor()",
    "function vote(bool _vote) external",
    "function voteCount() external view returns(uint)",
    "function currentStandings() external view returns(uint)"
];
```