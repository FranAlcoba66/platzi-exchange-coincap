<template>
  <main>
    <px-header :links="links"></px-header>

    <router-view class="container px-5 sm:px20 py-20 flex"></router-view>
  </main>
</template>

<script>
import PxHeader from "./components/PxHeader.vue";

export default {
  name: "App",
  components: {
    PxHeader,
  },

  data() {
    return {
      isLoading: false,
      links: [
        {
          title: "BTC",
          to: { name: "coin-detail", params: { id: "bitcoin" } },
        },
        {
          title: "ETH",
          to: { name: "coin-detail", params: { id: "ethereum" } },
        },
        {
          title: "XRP",
          to: { name: "coin-detail", params: { id: "ripple" } },
        },
      ],
    };
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
