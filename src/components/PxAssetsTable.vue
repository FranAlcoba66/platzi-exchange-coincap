<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <td>Logo</td>
        <th
          :class="{ up: this.shortOrder === 1, down: this.shortOrder === -1 }"
        >
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="asset in filterdAssets"
        :key="asset.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
          />
        </td>
        <td>{{ asset.rank }}</td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: asset.id } }"
          >
            {{ asset.name }}
          </router-link>
          <small>
            {{ asset.symbol }}
          </small>
        </td>
        <td>{{ asset.priceUsd | dollar }}</td>
        <td>{{ asset.marketCapUsd | dollar }}</td>
        <td
          :class="
            asset.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ asset.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(asset.id)" class="bg-blue-500">
            Ver Detalles
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "./PxButton.vue";
export default {
  name: "PxAssetsTable",

  components: {
    PxButton,
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      filter: "",
      shortOrder: 1,
    };
  },

  methods: {
    goToCoin(coinId) {
      this.$router.push({ name: "coin-detail", params: { id: coinId } });
    },

    changeSortOrder() {
      this.shortOrder = this.shortOrder === 1 ? -1 : 1;
    },
  },

  computed: {
    filterdAssets() {
      const altOrder = this.shortOrder === 1 ? -1 : 1;
      return this.assets
        .filter(
          (a) =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.shortOrder;
          }
          return altOrder;
        });
    },
  },
};
</script>

<style scoped>
/* General table styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9rem;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

/* Header styles */
thead {
  background-color: #f4f4f4;
}

thead th {
  text-align: left;
  padding: 15px;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #ddd;
}

/* Row styles */
tbody tr {
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

/* Cell styles */
td {
  padding: 15px;
  text-align: center;
  color: #555;
}

td img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Responsive styles */
@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }
}

.hidden {
  display: none;
}

.sm\\:block {
  display: block;
}

.text-red-600 {
  color: #e3342f;
}

.text-green-600 {
  color: #38a169;
}

.hover\\:underline:hover {
  text-decoration: underline;
}

.cursor-pointer {
  cursor: pointer;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.border-b {
  border-bottom: 1px solid #e2e8f0;
}

.border-gray-400 {
  border-color: #cbd5e0;
}

.border-gray-200 {
  border-color: #edf2f7;
}

.hover\\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.hover\\:bg-orange-100:hover {
  background-color: #fffaf0;
}
</style>
