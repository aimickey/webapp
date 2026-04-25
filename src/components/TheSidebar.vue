<template>
  <aside class="sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">
        <span class="material-icons-round">hexagon</span>
      </div>
      <transition name="fade">
        <span v-if="!appStore.sidebarCollapsed" class="logo-text">BaseWeb</span>
      </transition>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section-label" v-if="!appStore.sidebarCollapsed">メインメニュー</div>
      <router-link
        v-for="route in mainRoutes"
        :key="route.name"
        :to="route.path"
        class="nav-item"
        :class="{ active: $route.name === route.name }"
      >
        <span class="nav-icon material-icons-round">{{ route.meta.icon }}</span>
        <transition name="fade">
          <span v-if="!appStore.sidebarCollapsed" class="nav-label">{{ route.meta.title }}</span>
        </transition>
        <div v-if="$route.name === route.name" class="nav-active-indicator"></div>
      </router-link>
    </nav>

    <!-- Bottom Section -->
    <div class="sidebar-bottom">
      <div class="sidebar-user glass-light" v-if="!appStore.sidebarCollapsed">
        <div class="user-avatar">
          <span class="material-icons-round">person</span>
        </div>
        <div class="user-info">
          <span class="user-name">大島 太郎</span>
          <span class="user-role">管理者</span>
        </div>
        <button class="user-menu-btn" aria-label="ユーザーメニュー">
          <span class="material-icons-round">more_vert</span>
        </button>
      </div>
      <div class="sidebar-user-collapsed" v-else>
        <div class="user-avatar">
          <span class="material-icons-round">person</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

const mainRoutes = computed(() =>
  router.getRoutes().filter(r => r.meta?.icon)
)
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--gradient-sidebar);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width var(--transition-base);
  overflow: hidden;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-glow);
}

.logo-icon .material-icons-round {
  color: white;
  font-size: 22px;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: var(--space-4) var(--space-3);
  overflow-y: auto;
}

.nav-section-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: var(--space-2) var(--space-3);
  margin-bottom: var(--space-2);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: var(--font-size-sm);
  position: relative;
  transition: all var(--transition-fast);
  margin-bottom: var(--space-1);
  text-decoration: none;
  overflow: hidden;
}

.nav-item:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-2);
}

.nav-item.active {
  color: var(--color-accent-primary-light);
  background: rgba(99, 102, 241, 0.1);
}

.nav-icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.nav-label {
  white-space: nowrap;
}

.nav-active-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  box-shadow: var(--shadow-glow);
}

/* Bottom Section */
.sidebar-bottom {
  padding: var(--space-4) var(--space-3);
  border-top: 1px solid var(--color-border);
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
}

.sidebar-user-collapsed {
  display: flex;
  justify-content: center;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--gradient-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar .material-icons-round {
  font-size: 18px;
  color: white;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  display: block;
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.user-menu-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.user-menu-btn:hover {
  background: var(--color-surface-2);
  color: var(--color-text-primary);
}

.user-menu-btn .material-icons-round {
  font-size: 18px;
}

/* Collapsed state */
.collapsed .sidebar-logo {
  justify-content: center;
  padding: var(--space-6) var(--space-2);
}

.collapsed .nav-item {
  justify-content: center;
  padding: var(--space-3);
}

.collapsed .nav-section-label {
  display: none;
}

.collapsed .nav-active-indicator {
  display: none;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
}
</style>
