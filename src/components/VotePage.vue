<template>
  <div class="hello">
    <h1>Hello</h1>
    <button class="btn btn-primary" @click="connectButtonHandler">
      {{ connButtonText }}
    </button>
    <h3>{{ defaultAccount }}</h3>
  </div>
  <p></p>
</template>

<script>
//TODO: make button name "connect wallet" when wallet is not connected else "wallet connected"
//TODO: display the account hash when wallet connected
export default {
  data() {
    return {
      connButtonText: "Connect wallet",
      defaultAccount: "",
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
