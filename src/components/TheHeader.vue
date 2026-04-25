<template>
  <header class="header glass">
    <div class="header-left">
      <button class="header-btn" id="sidebar-toggle" @click="appStore.toggleSidebar" aria-label="サイドバー切替">
        <span class="material-icons-round">{{ appStore.sidebarCollapsed ? 'menu_open' : 'menu' }}</span>
      </button>
      <div class="header-breadcrumb">
        <span class="breadcrumb-icon material-icons-round">{{ currentRoute?.meta?.icon || 'home' }}</span>
        <span class="breadcrumb-text">{{ currentRoute?.meta?.title || 'ダッシュボード' }}</span>
      </div>
    </div>

    <div class="header-center">
      <div class="search-box" :class="{ focused: searchFocused }">
        <span class="search-icon material-icons-round">search</span>
        <input
          id="global-search"
          type="text"
          placeholder="検索..."
          v-model="searchQuery"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
          aria-label="グローバル検索"
        />
        <kbd class="search-shortcut" v-if="!searchFocused">⌘K</kbd>
      </div>
    </div>

    <div class="header-right">
      <button class="header-btn" id="notification-btn" @click="notifOpen = !notifOpen" aria-label="通知">
        <span class="material-icons-round">notifications</span>
        <span v-if="appStore.unreadCount() > 0" class="notif-badge">{{ appStore.unreadCount() }}</span>
      </button>

      <!-- Notification Dropdown -->
      <transition name="scale">
        <div v-if="notifOpen" class="notif-dropdown glass" @click.stop>
          <div class="notif-header">
            <h3>通知</h3>
            <button @click="appStore.markAllRead()" class="notif-mark-all">すべて既読にする</button>
          </div>
          <div class="notif-list">
            <div
              v-for="notif in appStore.notifications"
              :key="notif.id"
              class="notif-item"
              :class="{ unread: !notif.read }"
              @click="appStore.markNotificationRead(notif.id)"
            >
              <div class="notif-icon" :class="notif.type">
                <span class="material-icons-round">{{
                  notif.type === 'success' ? 'check_circle' :
                  notif.type === 'warning' ? 'warning' :
                  notif.type === 'error' ? 'error' : 'info'
                }}</span>
              </div>
              <div class="notif-content">
                <span class="notif-title">{{ notif.title }}</span>
                <span class="notif-message">{{ notif.message }}</span>
                <span class="notif-time">{{ notif.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>


    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()

const searchQuery = ref('')
const searchFocused = ref(false)
const notifOpen = ref(false)

const currentRoute = computed(() => route)
</script>

<style scoped>
.header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  position: sticky;
  top: 0;
  z-index: 50;
  gap: var(--space-4);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.header-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  position: relative;
}

.header-btn:hover {
  background: var(--color-surface-2);
  color: var(--color-text-primary);
}

.header-btn .material-icons-round {
  font-size: 22px;
}

/* Breadcrumb */
.header-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.breadcrumb-icon {
  font-size: 18px;
  color: var(--color-accent-primary-light);
}

.breadcrumb-text {
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}

/* Search */
.header-center {
  flex: 1;
  max-width: 480px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  height: 40px;
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.search-box.focused {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.search-icon {
  font-size: 18px;
  color: var(--color-text-muted);
}

.search-box input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
}

.search-box input::placeholder {
  color: var(--color-text-muted);
}

.search-shortcut {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-family: var(--font-family);
}

/* Header Right */
.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  position: relative;
}

/* Notification Badge */
.notif-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: var(--color-error);
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 2px solid var(--color-bg-card);
}

/* Notification Dropdown */
.notif-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 360px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  z-index: 200;
}

.notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.notif-header h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
}

.notif-mark-all {
  font-size: var(--font-size-xs);
  color: var(--color-accent-primary-light);
  font-weight: 500;
}

.notif-mark-all:hover {
  text-decoration: underline;
}

.notif-list {
  max-height: 320px;
  overflow-y: auto;
}

.notif-item {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.notif-item:hover {
  background: var(--color-surface-1);
}

.notif-item.unread {
  background: rgba(99, 102, 241, 0.05);
}

.notif-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notif-icon.info {
  background: rgba(96, 165, 250, 0.15);
  color: var(--color-info);
}

.notif-icon.success {
  background: rgba(52, 211, 153, 0.15);
  color: var(--color-success);
}

.notif-icon.warning {
  background: rgba(251, 191, 36, 0.15);
  color: var(--color-warning);
}

.notif-icon.error {
  background: rgba(248, 113, 113, 0.15);
  color: var(--color-error);
}

.notif-icon .material-icons-round {
  font-size: 18px;
}

.notif-content {
  flex: 1;
  min-width: 0;
}

.notif-title {
  display: block;
  font-weight: 600;
  font-size: var(--font-size-sm);
  margin-bottom: 2px;
}

.notif-message {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notif-time {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-top: 4px;
}

@media (max-width: 768px) {
  .header-center {
    display: none;
  }

  .header {
    padding: 0 var(--space-4);
  }
}
</style>
