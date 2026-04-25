import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'ダッシュボード', icon: 'dashboard' },
      component: HomeView,
    },
    {
      path: '/analytics',
      name: 'analytics',
      meta: { title: 'アナリティクス', icon: 'insights' },
      component: () => import('@/views/AnalyticsView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      meta: { title: 'プロジェクト', icon: 'folder_open' },
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/points',
      name: 'points',
      meta: { title: 'ポイント', icon: 'stars' },
      component: () => import('@/views/PointsView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { title: '設定', icon: 'settings' },
      component: () => import('@/views/SettingsView.vue'),
    },
  ],
})

export default router
