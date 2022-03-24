<template>
  <div id="app">
    <VotePage />
  </div>
</template>

<script>
import VotePage from "./components/VotePage.vue";

export default {
  name: "App",
  components: {
    VotePage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
