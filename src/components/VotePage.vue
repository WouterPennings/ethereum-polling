<template>
  <div>
    <h1>Hello</h1>
    <button class="btn btn-primary" @click="connectButtonHandler">
      {{ connButtonText }}
    </button>
    <div v-if="defaultAccount">
      <h6>Your wallet address is {{ defaultAccount }}</h6>
    </div>

    <div v-if="numberOfBlocks">
      <h4>Current number of blocks on the chain: {{ numberOfBlocks }}</h4>
    </div>
  </div>
  <hr />

  <div class="wrapper" v-if="defaultAccount">
    <div v-if="!alreadyVoted && alreadyVoted != null">
      <h5>You've already voted on this account</h5>
    </div>
    <div v-else-if="alreadyVoted">
      <h2>Vote</h2>
      <button @click="vote(true)">YES</button>
      <button @click="vote(false)">NO</button>
      <div v-if="numberOfVotes && currentStandings">
        <p>Number of votes {{ numberOfVotes }}</p>
        <p>Percentage of positive votes {{ currentStandings }} %</p>
      </div>
    </div>
  </div>
</template>

<script>
const { ethers } = require("ethers");
const Poll = require("../poll");
const BlockCount = require("../../scripts/count-blocks");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

function getWalletAddress() {
  window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
    return result[0];
  });
}

const p = new Poll("0x5FbDB2315678afecb367f032d93F642f64180aa3", provider);
const b = new BlockCount(provider);
const signer = provider.getSigner(getWalletAddress());

export default {
  data() {
    return {
      connButtonText: "Connect wallet",
      defaultAccount: null,
      numberOfVotes: null,
      numberOfBlocks: null,
      currentStandings: null,
      alreadyVoted: null,
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
            this.getCurrentStandings();
            this.getNumberOfBlocks();
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
      p.Vote(signer, result).then((value) => {
        if (value) {
          this.alreadyVoted = true;
        } else {
          this.alreadyVoted = false;
        }
      });
    },
    getNumberOfBlocks() {
      b.NumberOfBlocks().then((value) => (this.numberOfBlocks = value));
    },
    getNumberOfVotes() {
      p.VoteCount().then((value) => (this.numberOfVotes = value));
    },
    getCurrentStandings() {
      p.CurrentStandings().then((value) => (this.currentStandings = value));
    },
  },

  name: "VotePage",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h5 {
  color: red;
}
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
