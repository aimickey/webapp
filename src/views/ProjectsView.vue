<template>
  <div class="projects-view">
    <div class="page-header">
      <div><h1 class="page-title">プロジェクト</h1><p class="page-desc">進行中のプロジェクトを管理します。</p></div>
      <button class="btn-primary"><span class="material-icons-round">add</span>新規作成</button>
    </div>
    <div class="projects-grid">
      <div v-for="(p, i) in projects" :key="i" class="project-card" :style="{ animationDelay: i * 0.08 + 's' }">
        <div class="project-top" :style="{ background: p.gradient }"></div>
        <div class="project-body">
          <h3 class="project-name">{{ p.name }}</h3>
          <p class="project-desc">{{ p.desc }}</p>
          <div class="project-progress"><div class="progress-bar"><div class="progress-fill" :style="{ width: p.progress + '%' }"></div></div><span class="progress-text">{{ p.progress }}%</span></div>
          <div class="project-footer">
            <div class="project-members">
              <div v-for="n in p.members" :key="n" class="member-avatar" :style="{ background: ['var(--gradient-primary)','var(--gradient-accent)','var(--gradient-warm)'][n % 3] }">{{ n }}</div>
            </div>
            <span class="project-date">{{ p.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  { name: 'ECサイトリニューアル', desc: 'フロントエンドの全面刷新プロジェクト', progress: 72, gradient: 'var(--gradient-primary)', members: [1,2,3], date: '2026/05/15' },
  { name: 'モバイルアプリ v2', desc: 'React Nativeでのクロスプラットフォーム開発', progress: 45, gradient: 'var(--gradient-accent)', members: [1,2], date: '2026/06/30' },
  { name: 'データ基盤構築', desc: 'BigQuery + dbtによるデータパイプライン', progress: 88, gradient: 'var(--gradient-warm)', members: [1,2,3,4], date: '2026/04/30' },
  { name: 'AI チャットボット', desc: 'LLMを活用したカスタマーサポート自動化', progress: 23, gradient: 'linear-gradient(135deg,#34d399,#06b6d4)', members: [1,2], date: '2026/08/01' },
]
</script>

<style scoped>
.projects-view { display: flex; flex-direction: column; gap: var(--space-8); }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; }
.page-title { font-size: var(--font-size-2xl); font-weight: 800; letter-spacing: -0.02em; }
.page-desc { color: var(--color-text-secondary); margin-top: var(--space-2); }
.btn-primary { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-5); background: var(--gradient-primary); color: white; border-radius: var(--radius-lg); font-weight: 600; font-size: var(--font-size-sm); transition: all var(--transition-base); box-shadow: var(--shadow-glow); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-glow-lg); }
.btn-primary .material-icons-round { font-size: 18px; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-5); }
.project-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); overflow: hidden; animation: fadeInUp 0.5s ease-out both; transition: all var(--transition-base); }
.project-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--color-border-hover); }
.project-top { height: 6px; }
.project-body { padding: var(--space-6); }
.project-name { font-size: var(--font-size-base); font-weight: 700; margin-bottom: var(--space-2); }
.project-desc { font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-5); }
.project-progress { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-5); }
.progress-bar { flex: 1; height: 6px; background: var(--color-surface-2); border-radius: var(--radius-full); overflow: hidden; }
.progress-fill { height: 100%; background: var(--gradient-primary); border-radius: var(--radius-full); transition: width 1s ease-out; }
.progress-text { font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text-secondary); min-width: 36px; }
.project-footer { display: flex; justify-content: space-between; align-items: center; }
.project-members { display: flex; }
.member-avatar { width: 28px; height: 28px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: white; margin-left: -6px; border: 2px solid var(--color-bg-card); }
.member-avatar:first-child { margin-left: 0; }
.project-date { font-size: var(--font-size-xs); color: var(--color-text-muted); }
</style>
