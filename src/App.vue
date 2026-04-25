<template>
  <div v-if="isLoginPage" class="app-login-layout">
    <router-view />
  </div>
  <div v-else class="app-layout" :class="{ 'sidebar-collapsed': appStore.sidebarCollapsed }">
    <TheSidebar />
    <div class="app-main">
      <TheHeader />
      <main class="app-content bg-grid">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'

const route = useRoute()
const appStore = useAppStore()

const isLoginPage = computed(() => route.name === 'login')
</script>

<style scoped>
.app-login-layout {
  min-height: 100vh;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  transition: margin-left var(--transition-base);
  min-width: 0;
}

.sidebar-collapsed .app-main {
  margin-left: var(--sidebar-collapsed-width);
}

.app-content {
  flex: 1;
  padding: var(--space-8);
  max-width: var(--content-max-width);
  width: 100%;
  animation: fadeIn 0.4s ease-out;
}

@media (max-width: 768px) {
  .app-main {
    margin-left: 0;
  }

  .app-content {
    padding: var(--space-4);
  }
}
</style>
