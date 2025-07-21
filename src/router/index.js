import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Books from '../views/Book.vue';
import LoginPage from '../views/LoginPage.vue'; 
import UserPage from '../views/User.vue';
import AuthorPage from '../views/Authors.vue';
import BorrowedBooks from '../views/Borrowed.vue';
import RegisterPage from '../views/Register.vue';
const routes = [
  { path: '/', component: HomePage },
  { path: '/books', component: Books },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/users', component: UserPage},
  { path: '/authors', component: AuthorPage},
  { path: '/borroweds' , component:BorrowedBooks}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



