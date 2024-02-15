import { Router } from "@vaadin/router";
import { LoginForm } from './login-component';
import { RegisterForm } from './register-component'
import './main.css'

console.log("opaa");
const router = new Router(document.querySelector('body'));

router.setRoutes([
    { path: "/", component: 'login-form' },
    { path: "/register", component: 'register-form' }
]);