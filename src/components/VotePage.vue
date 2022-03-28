<template>
  <div class="hello">
    <h1>Hello</h1>
    <button class="btn btn-primary" @click="connectButtonHandler">
      {{ connButtonText }}
    </button>
    <h3>{{ defaultAccount }}</h3>
    <h4>Current number of block on the chain: {{ BlockCount(provider) }}</h4>
  </div>
  <p></p>
</template>

<script>
const { ethers } = require("ethers");
//const BlockCount = require("../scripts/count-blocks");
//const provider = new ethers.providers.JsonRpcProvider();
//TODO: make button name "connect wallet" when wallet is not connected else "wallet connected"
//TODO: display the account hash when wallet connected
export default {
  data() {
    return {
      connButtonText: "Connect wallet",
      defaultAccount: "",
      BlockCount: require("../../scripts/count-blocks"),
      provider: new ethers.providers.JsonRpcProvider(),
      changeButtonText() {
        return "Metamask installed";
      },
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
            });
        } else {
          //TODO: create custom error
          alert("you need to install metamask");
        }
      },
    };
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
</style>
