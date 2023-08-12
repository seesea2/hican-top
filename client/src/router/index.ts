import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "busArrival",
    },
    {
      path: "/busArrival",
      name: "BusArrival",
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
      name: "LearnEn",
      component: () => import("../views/Learn.vue"),
    },
  ],
});

export default router;
