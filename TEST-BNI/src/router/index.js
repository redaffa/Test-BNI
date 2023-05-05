import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from "../views/DashboardView.vue"
import AddUserView from "@/views/AddUserView.vue"
import EditUserView from "@/views/EditUserView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardView
    },
    {
      path: '/adduser',
      component: AddUserView
    },
    {
      path:"/edit/:id",
      component: EditUserView
    }
  ]
})

export default router
