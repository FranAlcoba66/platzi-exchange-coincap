<template>
  <div class="flex-col">
    <div>
      <bounce-loader
        class="custom-loader"
        :loading="isLoading"
        :size="100"
        color="#68D391"
      ></bounce-loader>
    </div>
    <template v-if="asset.id">
      <div class="flex flex-col lg:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>
        </div>
      </div>

      <span class="text-xl">
        {{ convertResult }}
        {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
      </span>
      <div class="my-10">
        <line-chart
          class="my-10"
          :colors="['orange']"
          :min="min"
          :max="max"
          :data="
            history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])
          "
        ></line-chart>
      </div>

      <h1 class="text-xl my-10">Mejores Ofertas De Cambio</h1>
      <table>
        <tr
          v-for="market in markets"
          :key="`{${market.exchangeId}-${market.priceUsd}}`"
        >
          <td>
            <b>{{ market.exchangeId }}</b>
          </td>
          <td>{{ market.priceUsd | dollar }}</td>
          <td>{{ market.baseSymbol }}/{{ market.quoteSymbol }}</td>
          <td>
            <px-button @custom-click="getWebSite(market)">
              <slot>Obtener Link</slot>
            </px-button>
            <a class="hover:underline text-green-600" target="_blank"></a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from "@/api";
import PxButton from "@/components/PxButton.vue";

export default {
  name: "CoinDetail",

  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: 0,
    };
  },

  components: {
    PxButton,
  },

  watch: {
    $route() {
      this.getCoin();
    },
  },

  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }

      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;
      console.log(result);

      return result.toFixed(4);
    },
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    avg() {
      return Math.abs(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
  },

  created() {
    this.getCoin();
  },

  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },
    getCoin() {
      const id = this.$route.params.id;
      this.isLoading = true;
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    getWebSite(exchange) {
      return api
        .getExchange(exchange.exchangeId)
        .then((res) => {
          if (res && res.exchangeUrl) {
            console.log(res);
            exchange.url = res.exchangeUrl;
          } else {
            console.error(
              "La respuesta de la API no contiene exchangeUrl:",
              res
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener el intercambio:", error);
        });
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
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
