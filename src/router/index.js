import{createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import LogIn from '../views/LogIn.vue'
import Books from '../components/Books.vue'
const routes =[
    {path: '/', component: Home },   // "/" bu varsa home.vue gösterir
    {path : '/login', component:  LogIn },
    {path: '/register', component:  Register },
    { path: '/books', component: Books }, 
     
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router