import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/AboutView.vue";
import CoinDetail from "./views/CoinDetail.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/coin/:id",
      name: "coin-detail",
      component: CoinDetail,
    },
  ],
});
