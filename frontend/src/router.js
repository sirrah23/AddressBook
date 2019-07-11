import Vue from "vue";
import Router from "vue-router";
import Register from "./views/Register.vue";
import Book from "./views/Book.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "register",
      component: Register
    },
    {
      path: "/book",
      name: "book",
      component: Book
    }
  ]
});
