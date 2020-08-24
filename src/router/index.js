import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import ChangePassword from "../views/ChangePassword.vue";
import CreateBook from "../views/CreateBook.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/updateProfile",
    name: "UpdateProfile",
    component: UpdateProfile
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword
  },
  {
    path: "/createBook",
    name: "CreateBook",
    component: CreateBook
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
