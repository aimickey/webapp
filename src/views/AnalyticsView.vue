<template>
  <div class="analytics-view">
    <div class="page-header">
      <h1 class="page-title">アナリティクス</h1>
      <p class="page-desc">データ分析とインサイトを確認できます。</p>
    </div>
    <div class="metrics-grid">
      <div v-for="(m, i) in metrics" :key="i" class="metric-card" :style="{ animationDelay: i * 0.1 + 's' }">
        <div class="metric-header">
          <span class="metric-label">{{ m.label }}</span>
          <span class="material-icons-round metric-icon" :style="{ color: m.color }">{{ m.icon }}</span>
        </div>
        <div class="metric-value">{{ m.value }}</div>
        <div class="metric-bar"><div class="metric-bar-fill" :style="{ width: m.percent + '%', background: m.color }"></div></div>
      </div>
    </div>
    <div class="placeholder-card">
      <span class="material-icons-round placeholder-icon">analytics</span>
      <p>詳細な分析チャートがここに表示されます</p>
    </div>
  </div>
</template>

<script setup>
const metrics = [
  { label: 'ページビュー', value: '284,521', icon: 'visibility', color: 'var(--color-accent-primary-light)', percent: 78 },
  { label: 'セッション時間', value: '4m 32s', icon: 'timer', color: 'var(--color-accent-secondary)', percent: 62 },
  { label: 'バウンス率', value: '24.8%', icon: 'exit_to_app', color: 'var(--color-accent-tertiary)', percent: 25 },
  { label: 'コンバージョン', value: '3.42%', icon: 'trending_up', color: 'var(--color-success)', percent: 45 },
]
</script>

<style scoped>
.analytics-view { display: flex; flex-direction: column; gap: var(--space-8); }
.page-header { margin-bottom: var(--space-2); }
.page-title { font-size: var(--font-size-2xl); font-weight: 800; letter-spacing: -0.02em; }
.page-desc { color: var(--color-text-secondary); margin-top: var(--space-2); }
.metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-5); }
.metric-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); animation: fadeInUp 0.5s ease-out both; transition: all var(--transition-base); }
.metric-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.metric-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3); }
.metric-label { font-size: var(--font-size-sm); color: var(--color-text-secondary); font-weight: 500; }
.metric-icon { font-size: 22px; }
.metric-value { font-size: var(--font-size-2xl); font-weight: 800; margin-bottom: var(--space-4); }
.metric-bar { height: 4px; background: var(--color-surface-2); border-radius: var(--radius-full); overflow: hidden; }
.metric-bar-fill { height: 100%; border-radius: var(--radius-full); transition: width 1s ease-out; }
.placeholder-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-16); display: flex; flex-direction: column; align-items: center; gap: var(--space-4); color: var(--color-text-muted); }
.placeholder-icon { font-size: 48px; opacity: 0.3; }
</style>
