import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: 'ログイン', requiresAuth: false },
      component: () => import('@/views/LoginView.vue'),
    },
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

// Navigation guard: redirect to login if not authenticated
router.beforeEach(async (to) => {
  // Dynamically import to avoid Pinia initialization order issues
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()

  // If going to a page that isn't login and user isn't authenticated, redirect to login
  if (to.name !== 'login' && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  // If going to login but already authenticated, redirect to home
  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
