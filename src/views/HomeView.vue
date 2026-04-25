<template>
  <div class="home-view">


    <section class="stats-grid">
      <StatCard v-for="(s, i) in stats" :key="i" :icon="s.icon" :icon-bg="s.iconBg" :label="s.label" :value="s.value" :trend="s.trend" :trend-value="s.trendValue" class="stat-anim" :style="{ animationDelay: i * 0.1 + 's' }" />
    </section>

    <div class="content-grid">
      <section class="content-card chart-card">
        <div class="card-header">
          <h2 class="card-title">アクティビティ概要</h2>
          <div class="card-actions">
            <button v-for="p in periods" :key="p.value" class="period-btn" :class="{ active: activePeriod === p.value }" @click="activePeriod = p.value">{{ p.label }}</button>
          </div>
        </div>
        <div class="chart-area">
          <div class="chart-bars">
            <div v-for="(bar, i) in chartData" :key="i" class="bar-group">
              <div class="chart-bar" :style="{ height: bar.value + '%' }" :class="{ hl: bar.hl }"><div class="bar-tip">{{ bar.value }}%</div></div>
              <span class="bar-label">{{ bar.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="content-card">
        <div class="card-header"><h2 class="card-title">最近のアクティビティ</h2><button class="see-all">すべて表示</button></div>
        <div class="act-list">
          <div v-for="(a, i) in activities" :key="i" class="act-item">
            <div class="act-icon" :class="a.type"><span class="material-icons-round">{{ a.icon }}</span></div>
            <div class="act-body"><span class="act-text">{{ a.text }}</span><span class="act-time">{{ a.time }}</span></div>
          </div>
        </div>
      </section>
    </div>

    <section class="quick-actions">
      <h2 class="sec-title">クイックアクション</h2>
      <div class="actions-grid">
        <button v-for="(qa, i) in quickActions" :key="i" class="action-card">
          <div class="qa-icon" :style="{ background: qa.bg }"><span class="material-icons-round">{{ qa.icon }}</span></div>
          <span class="qa-label">{{ qa.label }}</span>
          <span class="qa-desc">{{ qa.desc }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatCard from '@/components/StatCard.vue'

const activePeriod = ref('week')
const stats = [
  { icon: 'group', iconBg: 'rgba(99,102,241,0.15)', label: 'アクティブユーザー', value: '12,847', trend: 'up', trendValue: '+12.5%' },
  { icon: 'payments', iconBg: 'rgba(6,182,212,0.15)', label: '月間収益', value: '¥3.2M', trend: 'up', trendValue: '+8.2%' },
  { icon: 'shopping_cart', iconBg: 'rgba(244,114,182,0.15)', label: '新規注文', value: '1,432', trend: 'down', trendValue: '-2.4%' },
  { icon: 'speed', iconBg: 'rgba(251,191,36,0.15)', label: 'パフォーマンス', value: '98.5%', trend: 'up', trendValue: '+1.1%' },
]
const periods = [{ label: '週', value: 'week' }, { label: '月', value: 'month' }, { label: '年', value: 'year' }]
const chartData = [
  { label: '月', value: 65 }, { label: '火', value: 78 }, { label: '水', value: 52 },
  { label: '木', value: 91, hl: true }, { label: '金', value: 84 }, { label: '土', value: 43 }, { label: '日', value: 37 },
]
const activities = [
  { icon: 'person_add', type: 'info', text: '新しいユーザーが登録しました', time: '2分前' },
  { icon: 'check_circle', type: 'success', text: 'デプロイメントが完了しました', time: '15分前' },
  { icon: 'warning', type: 'warning', text: 'APIレートリミットに近づいています', time: '1時間前' },
  { icon: 'upload_file', type: 'info', text: 'レポートがエクスポートされました', time: '2時間前' },
  { icon: 'security', type: 'success', text: 'セキュリティスキャンが完了', time: '3時間前' },
]
const quickActions = [
  { icon: 'add_circle', label: '新規プロジェクト', desc: 'プロジェクトを作成', bg: 'var(--gradient-primary)' },
  { icon: 'upload', label: 'データインポート', desc: 'CSVをアップロード', bg: 'var(--gradient-accent)' },
  { icon: 'bar_chart', label: 'レポート生成', desc: '分析レポートを作成', bg: 'var(--gradient-warm)' },
  { icon: 'group_add', label: 'チーム招待', desc: 'メンバーを追加', bg: 'linear-gradient(135deg,#34d399,#06b6d4)' },
]
</script>

<style scoped>
.home-view { display: flex; flex-direction: column; gap: var(--space-8); }
.welcome-banner { position: relative; background: var(--gradient-hero); border: 1px solid var(--color-border); border-radius: var(--radius-2xl); padding: var(--space-10) var(--space-8); overflow: hidden; }
.welcome-content { position: relative; z-index: 1; }
.welcome-title { font-size: var(--font-size-3xl); font-weight: 800; margin-bottom: var(--space-3); letter-spacing: -0.02em; }
.welcome-desc { color: var(--color-text-secondary); font-size: var(--font-size-base); max-width: 500px; }
.welcome-deco { position: absolute; top: 0; right: 0; bottom: 0; width: 50%; pointer-events: none; }
.orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.4; animation: float 6s ease-in-out infinite; }
.orb-1 { width: 200px; height: 200px; background: var(--color-accent-primary); top: -30%; right: 10%; }
.orb-2 { width: 150px; height: 150px; background: var(--color-accent-secondary); bottom: -20%; right: 30%; animation-delay: 2s; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-5); }
.stat-anim { animation: fadeInUp 0.5s ease-out both; }
.content-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-6); }
.content-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-6); }
.card-title { font-size: var(--font-size-lg); font-weight: 700; }
.card-actions { display: flex; gap: var(--space-1); background: var(--color-surface-1); padding: 3px; border-radius: var(--radius-md); }
.period-btn { padding: var(--space-1) var(--space-3); border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: 500; color: var(--color-text-secondary); transition: all var(--transition-fast); }
.period-btn.active { background: var(--color-accent-primary); color: white; }
.see-all { font-size: var(--font-size-sm); color: var(--color-accent-primary-light); font-weight: 500; }
.chart-area { height: 220px; display: flex; align-items: flex-end; }
.chart-bars { display: flex; align-items: flex-end; gap: var(--space-4); width: 100%; height: 100%; padding-bottom: var(--space-6); }
.bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); height: 100%; justify-content: flex-end; }
.chart-bar { width: 100%; max-width: 40px; background: linear-gradient(180deg, var(--color-accent-primary) 0%, var(--color-accent-primary-dark) 100%); border-radius: var(--radius-sm) var(--radius-sm) 0 0; transition: all var(--transition-base); position: relative; cursor: pointer; min-height: 4px; }
.chart-bar.hl { background: var(--gradient-primary); box-shadow: var(--shadow-glow); }
.chart-bar:hover { opacity: 0.85; }
.bar-tip { position: absolute; top: -28px; left: 50%; transform: translateX(-50%); background: var(--color-bg-card); border: 1px solid var(--color-border); padding: 2px 8px; border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: 600; opacity: 0; transition: opacity var(--transition-fast); pointer-events: none; }
.chart-bar:hover .bar-tip { opacity: 1; }
.bar-label { font-size: var(--font-size-xs); color: var(--color-text-muted); }
.act-list { display: flex; flex-direction: column; gap: var(--space-1); }
.act-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-2); border-radius: var(--radius-md); transition: background var(--transition-fast); }
.act-item:hover { background: var(--color-surface-1); }
.act-icon { width: 36px; height: 36px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.act-icon.info { background: rgba(96,165,250,0.12); color: var(--color-info); }
.act-icon.success { background: rgba(52,211,153,0.12); color: var(--color-success); }
.act-icon.warning { background: rgba(251,191,36,0.12); color: var(--color-warning); }
.act-icon .material-icons-round { font-size: 18px; }
.act-body { flex: 1; }
.act-text { display: block; font-size: var(--font-size-sm); font-weight: 500; margin-bottom: 2px; }
.act-time { display: block; font-size: var(--font-size-xs); color: var(--color-text-muted); }
.sec-title { font-size: var(--font-size-lg); font-weight: 700; margin-bottom: var(--space-5); }
.actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-4); }
.action-card { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); padding: var(--space-6) var(--space-4); background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); transition: all var(--transition-base); text-align: center; }
.action-card:hover { transform: translateY(-4px); border-color: var(--color-border-hover); box-shadow: var(--shadow-lg); }
.qa-icon { width: 48px; height: 48px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; }
.qa-icon .material-icons-round { font-size: 24px; color: white; }
.qa-label { font-weight: 600; font-size: var(--font-size-sm); }
.qa-desc { font-size: var(--font-size-xs); color: var(--color-text-muted); }
@media (max-width: 1024px) { .content-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .welcome-banner { padding: var(--space-6); } .welcome-title { font-size: var(--font-size-2xl); } .stats-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
