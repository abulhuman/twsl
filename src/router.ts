import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/dashboard',
    component: Dashboard
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});

