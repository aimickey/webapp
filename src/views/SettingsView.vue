<template>
  <div class="settings-view">
    <div class="page-header"><h1 class="page-title">設定</h1><p class="page-desc">アプリケーションの設定を管理します。</p></div>
    <div class="settings-sections">
      <section v-for="(sec, i) in sections" :key="i" class="settings-section" :style="{ animationDelay: i * 0.1 + 's' }">
        <h2 class="section-title">{{ sec.title }}</h2>
        <div class="settings-list">
          <div v-for="(item, j) in sec.items" :key="j" class="setting-item">
            <div class="setting-info"><span class="setting-label">{{ item.label }}</span><span class="setting-desc">{{ item.desc }}</span></div>
            <div class="setting-control">
              <label v-if="item.type === 'toggle'" class="toggle"><input type="checkbox" :checked="item.value"><span class="toggle-slider"></span></label>
              <select v-else-if="item.type === 'select'" class="setting-select"><option v-for="o in item.options" :key="o" :selected="o === item.value">{{ o }}</option></select>
              <input v-else type="text" class="setting-input" :value="item.value" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const sections = [
  { title: '一般', items: [
    { label: '言語', desc: 'インターフェースの表示言語', type: 'select', options: ['日本語', 'English', '中文'], value: '日本語' },
    { label: 'テーマ', desc: '外観のテーマを切り替えます', type: 'select', options: ['ダーク', 'ライト', 'システム'], value: 'ダーク' },
    { label: 'アニメーション', desc: 'UIアニメーションの有効化', type: 'toggle', value: true },
  ]},
  { title: '通知', items: [
    { label: 'メール通知', desc: '重要な更新をメールで受信', type: 'toggle', value: true },
    { label: 'プッシュ通知', desc: 'ブラウザのプッシュ通知', type: 'toggle', value: false },
    { label: 'サウンド', desc: '通知時のサウンド再生', type: 'toggle', value: true },
  ]},
  { title: 'アカウント', items: [
    { label: '表示名', desc: 'プロフィールに表示される名前', type: 'text', value: '山田 太郎' },
    { label: 'メールアドレス', desc: 'アカウントに紐づくメール', type: 'text', value: 'taro@example.com' },
  ]},
]
</script>

<style scoped>
.settings-view { display: flex; flex-direction: column; gap: var(--space-8); max-width: 800px; }
.settings-sections { display: flex; flex-direction: column; gap: var(--space-6); }
.page-title { font-size: var(--font-size-2xl); font-weight: 800; letter-spacing: -0.02em; }
.page-desc { color: var(--color-text-secondary); margin-top: var(--space-2); }
.settings-section { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); animation: fadeInUp 0.5s ease-out both; }
.section-title { font-size: var(--font-size-base); font-weight: 700; margin-bottom: var(--space-5); padding-bottom: var(--space-4); border-bottom: 1px solid var(--color-border); }
.setting-item { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) 0; border-bottom: 1px solid var(--color-surface-1); }
.setting-item:last-child { border-bottom: none; padding-bottom: 0; }
.setting-info { display: flex; flex-direction: column; gap: var(--space-1); }
.setting-label { font-weight: 600; font-size: var(--font-size-sm); }
.setting-desc { font-size: var(--font-size-xs); color: var(--color-text-muted); }
.setting-control { flex-shrink: 0; display: flex; align-items: center; }
.toggle { position: relative; display: inline-block; width: 44px; min-width: 44px; height: 24px; cursor: pointer; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; inset: 0; background: var(--color-surface-3); border-radius: var(--radius-full); transition: var(--transition-base); }
.toggle-slider::before { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: white; top: 3px; left: 3px; transition: var(--transition-base); }
.toggle input:checked + .toggle-slider { background: var(--color-accent-primary); }
.toggle input:checked + .toggle-slider::before { transform: translateX(20px); }
.setting-select, .setting-input { background: var(--color-bg-input); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); color: var(--color-text-primary); font-size: var(--font-size-sm); outline: none; transition: border-color var(--transition-fast); min-width: 160px; }
.setting-select:focus, .setting-input:focus { border-color: var(--color-accent-primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
</style>
