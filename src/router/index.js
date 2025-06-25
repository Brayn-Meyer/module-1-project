import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import EmployeeView from '@/views/EmployeePage.vue'
import PayrollView from '@/views/PayrollView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import LeaveRequestView from '@/views/LeaveRequest.vue'
import LoginView from '@/views/LoginView.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollView
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendanceView
  },
  {
    path: '/leaverequest',
    name: 'leaverequest',
    component: LeaveRequestView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
