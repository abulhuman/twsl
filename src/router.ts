import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard.vue';
import CreateOrder from './pages/CreateOrder.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/dashboard/order/new',
    component: CreateOrder
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});

