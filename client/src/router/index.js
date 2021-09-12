import { createRouter, createWebHistory } from "vue-router";
import BusArrival from "../views/BusArrival.vue";

const routes = [
  {
    path: "/",
    name: "BusArrival",
    component: BusArrival,
  },
  {
    path: "/busArrivalTime/:inputCode",
    name: "BusArrivalTime",
    component: () => import("../views/BusArrivalTime.vue"),
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: () => import("../views/Dictionary.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
