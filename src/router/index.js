import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Books from '../views/Book.vue';
import LoginPage from '../views/LoginPage.vue'; 
import Register from '../views/Register.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/books', component: Books },
  { path: '/login', component: LoginPage },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



