import { Router } from "@vaadin/router";
import "./login-component";
import "./register-component";
import "./home-page-component";
import "./main.css";

const router = new Router(document.querySelector("body"));

router.setRoutes([
  { path: "/", component: "login-form" },
  { path: "/register", component: "register-form" },
  { path: "/home", component: "home-page" },
  { path: "/recipes/:recipeName", component: "recipe-page" },
]);
