<template>
  <div>
    <h1>Hello</h1>
    <button class="btn btn-primary" @click="connectButtonHandler">
      {{ connButtonText }}
    </button>
    <h3>{{ defaultAccount }}</h3>
    <div v-if="isNaN(numberOfBlocks())">
      <h4>Current number of block on the chain: {{}}</h4>
    </div>
  </div>
  <hr />
  <div>
    <h2>Vote</h2>
    <div class="wrapper"></div>
    <button @click="vote(true)">YES</button>
    <button @click="vote(false)">NO</button>
  </div>
  <p>Number of votes {{ numberOfVotes }}</p>
  <p>Number of positive votes {{ currentStandings }}</p>
</template>

<script>
const { ethers } = require("ethers");
const Poll = require("../poll");
const BlockCount = require("../../scripts/count-blocks");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const p = new Poll("0x5FbDB2315678afecb367f032d93F642f64180aa3", provider);
const b = new BlockCount(provider);
const signer = provider.getSigner("0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f");

export default {
  data() {
    return {
      connButtonText: "Connect wallet",
      defaultAccount: "",
      numberOfVotes: "",
      currentStandings: "",
    };
  },
  methods: {
    connectButtonHandler() {
      //Check if metamask is installed
      if (window.ethereum) {
        //connection with metamask
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            console.log(result[0]);
            this.defaultAccount = result[0];
            this.connButtonText = "Wallet connected";
            this.getNumberOfVotes();
          });
      } else {
        //TODO: create custom error
        alert("you need to install metamask");
      }
    },
    changeButtonText() {
      return "Metamask installed";
    },
    vote(result) {
      //TODO: figure out always votes false
      p.Vote(signer, result).then((value) =>
        console.log("Successfully voted:" + value)
      );
    },
    numberOfBlocks() {
      //Not displaying correctly
      return b.NumberOfBlocks();
    },
    getNumberOfVotes() {
      this.numberOfVotes = p.VoteCount();
      console.log(p.VoteCount());
    },
    getCurrentStandings() {
      this.currentStandings = p.CurrentStandings();
      console.log(p.CurrentStandings());
    },
  },

  name: "VotePage",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrapper {
  flex: 1 0 auto;
}

button {
  margin: 0 10px;
}
</style>
