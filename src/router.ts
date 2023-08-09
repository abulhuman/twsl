import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard.vue';
import CreateOrder from './pages/CreateOrder.vue';
import OrderDetailPage from './pages/OrderDetailPage.vue';

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
  },
  {
    path: '/dashboard/order/:id',
    component: OrderDetailPage
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});

