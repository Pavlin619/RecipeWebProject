import { Router } from "@vaadin/router";
import { LoginForm } from "./login-component";
import { RegisterForm } from "./register-component";
import { HomePage } from "./home-page-component";
import "./recipe-page-component"
import "./main.css";

const router = new Router(document.querySelector("body"));

router.setRoutes([
  { path: "/", component: "login-form" },
  { path: "/register", component: "register-form" },
  { path: "/home", component: "home-page" },
  { path: "/recipe-details", component: "recipe-page" },
]);
