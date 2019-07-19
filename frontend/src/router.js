import Vue from "vue";
import Router from "vue-router";
import Portal from "./views/Portal";
import Book from "./views/Book";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "portal",
      component: Portal
    },
    {
      path: "/book",
      name: "book",
      component: Book
    }
  ]
});
