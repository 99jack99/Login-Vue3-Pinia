import { createRouter, createWebHistory } from 'vue-router'

import {useAuthStore} from "../stores/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Sign up',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
  ]
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore();

    const publicPage = ['/login','/signup'];
    const requiredAuth = !publicPage.includes(to.path);

    if (!authStore.token && requiredAuth) {
        return '/login';
    }
});

export default router
