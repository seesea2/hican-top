import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Root",
    component: () => import("../views/BusArrival.vue"),
  },
  {
    path: "/busArrivalTime/:inputCode",
    name: "BusArrivalTime",
    component: () => import("../views/BusArrivalTime.vue"),
  },
  {
    path: "/podcast",
    name: "Podcast",
    component: () => import("../views/Podcast.vue"),
  },
  {
    path: "/learn/:user?",
    name: "Learn",
    component: () => import("../views/Learn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});

export default router;
