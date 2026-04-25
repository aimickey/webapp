<template>
  <div class="stat-card" :class="trend">
    <div class="stat-card-header">
      <div class="stat-icon-wrap" :style="{ background: iconBg }">
        <span class="material-icons-round">{{ icon }}</span>
      </div>
      <div class="stat-trend" :class="trend">
        <span class="material-icons-round trend-icon">{{ trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'trending_flat' }}</span>
        <span class="trend-value">{{ trendValue }}</span>
      </div>
    </div>
    <div class="stat-card-body">
      <span class="stat-value">{{ value }}</span>
      <span class="stat-label">{{ label }}</span>
    </div>
    <div class="stat-card-shine"></div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  iconBg: { type: String, default: 'rgba(99, 102, 241, 0.15)' },
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  trend: { type: String, default: 'neutral' },
  trendValue: { type: String, default: '0%' },
})
</script>

<style scoped>
.stat-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-lg);
}

.stat-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-5);
}

.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrap .material-icons-round {
  font-size: 22px;
  color: var(--color-accent-primary-light);
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.stat-trend.up {
  background: rgba(52, 211, 153, 0.1);
  color: var(--color-success);
}

.stat-trend.down {
  background: rgba(248, 113, 113, 0.1);
  color: var(--color-error);
}

.stat-trend.neutral {
  background: var(--color-surface-2);
  color: var(--color-text-muted);
}

.trend-icon {
  font-size: 16px;
}

.stat-card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.stat-card-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gradient-card-shine);
}
</style>
