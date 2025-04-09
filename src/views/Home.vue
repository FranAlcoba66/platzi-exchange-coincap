<template>
  <div class="loader-container">
    <bounce-loader
      class="custom-loader"
      :loading="isLoading"
      :size="100"
      color="#68D391"
    ></bounce-loader>
    <px-assets-table
      v-if="isLoading == false"
      :assets="assets"
    ></px-assets-table>
  </div>
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable.vue";
import api from "@/api";
export default {
  name: "HomeView",

  components: {
    PxAssetsTable,
  },

  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },

  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => {
        this.assets = assets;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style scoped>
.loader-container {
  position: relative;
  height: 100vh;
}

.custom-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
