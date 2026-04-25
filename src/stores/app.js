import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const currentTheme = ref('dark')
  const notifications = ref([
    { id: 1, title: '新しいアップデート', message: 'v2.1.0がリリースされました', time: '5分前', read: false, type: 'info' },
    { id: 2, title: 'タスク完了', message: 'デプロイが正常に完了しました', time: '15分前', read: false, type: 'success' },
    { id: 3, title: 'パフォーマンス警告', message: 'CPU使用率が85%を超えています', time: '1時間前', read: true, type: 'warning' },
  ])

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function markNotificationRead(id) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) notification.read = true
  }

  function markAllRead() {
    notifications.value.forEach(n => n.read = true)
  }

  const unreadCount = () => notifications.value.filter(n => !n.read).length

  return {
    sidebarCollapsed,
    currentTheme,
    notifications,
    toggleSidebar,
    markNotificationRead,
    markAllRead,
    unreadCount,
  }
})
