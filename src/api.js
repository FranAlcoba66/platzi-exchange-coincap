const url = "https://rest.coincap.io/v3";
const apiKey =
  "3ec150788ba798740de03577e224bd780fb57091ae9d091deed5e6482d885d74";

function getHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
}

function getAssets() {
  return fetch(`${url}/assets?limit=20`, getHeaders())
    .then((res) => res.json())
    .then((res) => res.data);
}

function getAsset(coin) {
  return fetch(`${url}/assets/${coin}`, getHeaders())
    .then((res) => res.json())
    .then((res) => res.data);
}

function getAssetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();

  return fetch(
    `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`,
    getHeaders()
  )
    .then((res) => res.json())
    .then((res) => res.data);
}

function getMarkets(coin) {
  return fetch(`${url}/assets/${coin}/markets?limit=5`, getHeaders())
    .then((res) => res.json())
    .then((res) => res.data);
}

function getExchange(id) {
  return fetch(`${url}/exchanges/${id}`, getHeaders())
    .then((res) => res.json())
    .then((res) => res.data);
}

export default {
  getAssets,
  getAsset,
  getAssetHistory,
  getMarkets,
  getExchange,
};
