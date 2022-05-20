import { createRouter, createWebHistory } from "vue-router";
import BusArrival from "../views/BusArrival.vue";

const routes = [
  {
    path: "/",
    name: "Root",
    component: BusArrival,
  },
  {
    path: "/busArrivalTime/:inputCode",
    name: "BusArrivalTime",
    component: () => import("../views/BusArrivalTime.vue"),
  },
  // {
  //   path: "/dictionary/:word?",
  //   name: "Dictionary",
  //   component: () => import("../views/Dictionary.vue"),
  // },
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
  {
    path: "/activities",
    name: "Activities",
    component: () => import("../views/ActivitiesTemplates.vue"),
  },
  {
    path: "/act-table",
    name: "ActivitiesTable",
    component: () => import("../views/ActivitiesTable.vue"),
  },
  {
    path: "/act-cal",
    name: "ActivitieCalendar",
    component: () => import("../views/ActivitiesCalendar.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
