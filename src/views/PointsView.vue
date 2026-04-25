<template>
  <div class="points-view">
    <!-- ヘッダーバナー -->
    <section class="points-banner">
      <div class="banner-content">
        <h1 class="banner-title">
          <span class="material-icons-round banner-icon">stars</span>
          スタンプカード
        </h1>
        <p class="banner-desc">スタンプを集めてコンビニクーポンと交換しよう！</p>
      </div>
      <div class="points-counter">
        <span class="counter-current">{{ store.currentPoints }}</span>
        <span class="counter-sep">/</span>
        <span class="counter-max">{{ store.maxPoints }}</span>
        <span class="counter-label">ポイント</span>
      </div>
      <div class="banner-orbs"><div class="orb orb-a"></div><div class="orb orb-b"></div></div>
    </section>

    <!-- プログレスバー -->
    <section class="progress-section content-card">
      <div class="progress-header">
        <span class="progress-title">獲得状況</span>
        <span class="progress-pct">{{ Math.round(store.progressPercent) }}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: store.progressPercent + '%' }"></div>
      </div>
    </section>

    <!-- スタンプグリッド -->
    <section class="stamp-section content-card">
      <h2 class="sec-title">スタンプ</h2>
      <div class="stamp-grid">
        <div v-for="i in store.maxPoints" :key="i" class="stamp-slot" :class="{ filled: i <= store.currentPoints, latest: i === store.currentPoints }">
          <span v-if="i <= store.currentPoints" class="material-icons-round stamp-icon">verified</span>
          <span v-else class="stamp-num">{{ i }}</span>
        </div>
      </div>
      <button class="stamp-btn" :class="{ disabled: store.isFull }" :disabled="store.isFull" @click="handleAddPoint" id="add-stamp-btn">
        <span class="material-icons-round">add_circle</span>
        {{ store.isFull ? 'スタンプが満タンです！' : 'スタンプを獲得する' }}
      </button>
    </section>

    <!-- クーポン一覧 -->
    <section class="coupons-section">
      <h2 class="sec-title">交換できるクーポン</h2>
      <div class="coupons-grid">
        <div v-for="c in store.coupons" :key="c.id" class="coupon-card content-card" :class="{ affordable: store.canExchange(c) }">
          <div class="coupon-icon-wrap" :style="{ background: c.gradient }">
            <span class="material-icons-round">{{ c.icon }}</span>
          </div>
          <div class="coupon-info">
            <span class="coupon-name">{{ c.name }}</span>
            <span class="coupon-desc">{{ c.description }}</span>
            <span class="coupon-store">{{ c.store }}</span>
          </div>
          <div class="coupon-action">
            <span class="coupon-cost">{{ c.cost }} pt</span>
            <button class="coupon-btn" :class="{ can: store.canExchange(c) }" :disabled="!store.canExchange(c)" @click="store.openCouponModal(c)">交換</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 交換履歴 -->
    <section v-if="store.couponHistory.length" class="history-section content-card">
      <h2 class="sec-title">交換履歴</h2>
      <div class="history-list">
        <div v-for="h in store.couponHistory" :key="h.id" class="history-item">
          <span class="material-icons-round history-icon">redeem</span>
          <span class="history-name">{{ h.couponName }}</span>
          <span class="history-store">{{ h.store }}</span>
          <span class="history-date">{{ h.date }}</span>
          <span class="history-cost">-{{ h.cost }} pt</span>
        </div>
      </div>
    </section>

    <!-- 交換確認モーダル -->
    <transition name="fade">
      <div v-if="store.showCouponModal" class="modal-overlay" @click="store.closeCouponModal">
        <transition name="scale">
          <div class="modal-card" @click.stop v-if="store.showCouponModal">
            <!-- 交換前 -->
            <template v-if="!store.lastExchangedCoupon">
              <div class="modal-icon" :style="{ background: store.selectedCoupon?.gradient }">
                <span class="material-icons-round">{{ store.selectedCoupon?.icon }}</span>
              </div>
              <h3 class="modal-title">クーポン交換</h3>
              <p class="modal-desc">「{{ store.selectedCoupon?.name }}」と交換しますか？</p>
              <p class="modal-cost">{{ store.selectedCoupon?.cost }} ポイント消費</p>
              <div class="modal-actions">
                <button class="modal-btn cancel" @click="store.closeCouponModal">キャンセル</button>
                <button class="modal-btn confirm" @click="confirmExchange">交換する</button>
              </div>
            </template>
            <!-- 交換後 -->
            <template v-else>
              <div class="modal-success-icon"><span class="material-icons-round">celebration</span></div>
              <h3 class="modal-title">交換完了！</h3>
              <p class="modal-desc">「{{ store.lastExchangedCoupon.name }}」を獲得しました🎉</p>
              <p class="modal-sub">{{ store.lastExchangedCoupon.store }}でご利用いただけます</p>
              <button class="modal-btn confirm full" @click="store.closeCouponModal">閉じる</button>
            </template>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { usePointsStore } from '@/stores/points'

const store = usePointsStore()

function handleAddPoint() {
  store.addPoint()
}

function confirmExchange() {
  if (store.selectedCoupon) {
    store.exchangeCoupon(store.selectedCoupon)
  }
}
</script>

<style scoped>
.points-view { display: flex; flex-direction: column; gap: var(--space-6); }

/* Banner */
.points-banner { position: relative; background: var(--gradient-hero); border: 1px solid var(--color-border); border-radius: var(--radius-2xl); padding: var(--space-8); display: flex; align-items: center; justify-content: space-between; overflow: hidden; }
.banner-content { position: relative; z-index: 1; }
.banner-title { font-size: var(--font-size-2xl); font-weight: 800; display: flex; align-items: center; gap: var(--space-3); }
.banner-icon { font-size: 32px; color: var(--color-warning); }
.banner-desc { color: var(--color-text-secondary); margin-top: var(--space-2); }
.points-counter { position: relative; z-index: 1; text-align: center; background: rgba(255,255,255,0.05); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-4) var(--space-6); }
.counter-current { font-size: var(--font-size-4xl); font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.counter-sep { font-size: var(--font-size-xl); color: var(--color-text-muted); margin: 0 var(--space-1); }
.counter-max { font-size: var(--font-size-xl); color: var(--color-text-secondary); }
.counter-label { display: block; font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: var(--space-1); }
.banner-orbs { position: absolute; inset: 0; pointer-events: none; }
.orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.3; animation: float 6s ease-in-out infinite; }
.orb-a { width: 180px; height: 180px; background: var(--color-accent-primary); top: -40%; right: 20%; }
.orb-b { width: 120px; height: 120px; background: var(--color-accent-tertiary); bottom: -30%; right: 40%; animation-delay: 2s; }

/* Progress */
.progress-section { padding: var(--space-5) var(--space-6); }
.progress-header { display: flex; justify-content: space-between; margin-bottom: var(--space-3); }
.progress-title { font-weight: 600; font-size: var(--font-size-sm); }
.progress-pct { font-weight: 700; font-size: var(--font-size-sm); color: var(--color-accent-primary-light); }
.progress-track { height: 8px; background: var(--color-surface-2); border-radius: var(--radius-full); overflow: hidden; }
.progress-fill { height: 100%; background: var(--gradient-primary); border-radius: var(--radius-full); transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }

/* Content card (shared) */
.content-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); }
.sec-title { font-size: var(--font-size-lg); font-weight: 700; margin-bottom: var(--space-5); }

/* Stamps */
.stamp-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-4); margin-bottom: var(--space-6); }
.stamp-slot { aspect-ratio: 1; border-radius: var(--radius-xl); border: 2px dashed var(--color-border); display: flex; align-items: center; justify-content: center; font-size: var(--font-size-lg); color: var(--color-text-muted); transition: all var(--transition-base); }
.stamp-slot.filled { border: 2px solid var(--color-accent-primary); background: rgba(99,102,241,0.1); animation: stampPop 0.4s ease-out; }
.stamp-slot.latest { box-shadow: 0 0 16px rgba(99,102,241,0.4); }
.stamp-icon { font-size: 32px; color: var(--color-accent-primary-light); }
.stamp-num { font-weight: 700; opacity: 0.4; }
.stamp-btn { width: 100%; padding: var(--space-4); border-radius: var(--radius-lg); background: var(--gradient-primary); color: white; font-weight: 700; font-size: var(--font-size-base); display: flex; align-items: center; justify-content: center; gap: var(--space-2); transition: all var(--transition-base); box-shadow: var(--shadow-glow); }
.stamp-btn:hover:not(.disabled) { transform: translateY(-2px); box-shadow: var(--shadow-glow-lg); }
.stamp-btn.disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }

/* Coupons */
.coupons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-4); }
.coupon-card { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4) var(--space-5); transition: all var(--transition-base); opacity: 0.6; }
.coupon-card.affordable { opacity: 1; }
.coupon-card.affordable:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.coupon-icon-wrap { width: 48px; height: 48px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.coupon-icon-wrap .material-icons-round { font-size: 24px; color: white; }
.coupon-info { flex: 1; min-width: 0; }
.coupon-name { display: block; font-weight: 700; font-size: var(--font-size-sm); margin-bottom: 2px; }
.coupon-desc { display: block; font-size: var(--font-size-xs); color: var(--color-text-secondary); }
.coupon-store { display: block; font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 2px; }
.coupon-action { text-align: center; flex-shrink: 0; }
.coupon-cost { display: block; font-weight: 800; font-size: var(--font-size-sm); color: var(--color-accent-primary-light); margin-bottom: var(--space-2); }
.coupon-btn { padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); font-weight: 600; font-size: var(--font-size-xs); background: var(--color-surface-2); color: var(--color-text-muted); transition: all var(--transition-fast); }
.coupon-btn.can { background: var(--gradient-primary); color: white; cursor: pointer; }
.coupon-btn.can:hover { box-shadow: var(--shadow-glow); }

/* History */
.history-list { display: flex; flex-direction: column; gap: var(--space-2); }
.history-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-2); border-radius: var(--radius-md); transition: background var(--transition-fast); }
.history-item:hover { background: var(--color-surface-1); }
.history-icon { font-size: 20px; color: var(--color-success); }
.history-name { flex: 1; font-weight: 600; font-size: var(--font-size-sm); }
.history-store { font-size: var(--font-size-xs); color: var(--color-text-muted); margin-right: var(--space-4); }
.history-date { font-size: var(--font-size-xs); color: var(--color-text-muted); margin-right: var(--space-4); }
.history-cost { font-weight: 700; font-size: var(--font-size-sm); color: var(--color-accent-tertiary); }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: var(--color-bg-overlay); display: flex; align-items: center; justify-content: center; z-index: 500; }
.modal-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-2xl); padding: var(--space-8); max-width: 400px; width: 90%; text-align: center; }
.modal-icon { width: 64px; height: 64px; border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-5); }
.modal-icon .material-icons-round { font-size: 32px; color: white; }
.modal-success-icon { width: 72px; height: 72px; border-radius: var(--radius-full); background: rgba(52,211,153,0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-5); }
.modal-success-icon .material-icons-round { font-size: 36px; color: var(--color-success); }
.modal-title { font-size: var(--font-size-xl); font-weight: 800; margin-bottom: var(--space-3); }
.modal-desc { color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-2); }
.modal-cost { font-weight: 700; color: var(--color-accent-tertiary); font-size: var(--font-size-sm); margin-bottom: var(--space-6); }
.modal-sub { font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-6); }
.modal-actions { display: flex; gap: var(--space-3); }
.modal-btn { flex: 1; padding: var(--space-3); border-radius: var(--radius-lg); font-weight: 700; font-size: var(--font-size-sm); transition: all var(--transition-fast); }
.modal-btn.cancel { background: var(--color-surface-2); color: var(--color-text-secondary); }
.modal-btn.cancel:hover { background: var(--color-surface-3); }
.modal-btn.confirm { background: var(--gradient-primary); color: white; }
.modal-btn.confirm:hover { box-shadow: var(--shadow-glow); }
.modal-btn.full { margin-top: var(--space-4); }

@keyframes stampPop { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }

@media (max-width: 768px) {
  .points-banner { flex-direction: column; gap: var(--space-4); text-align: center; padding: var(--space-6); }
  .stamp-grid { grid-template-columns: repeat(5, 1fr); gap: var(--space-3); }
  .coupons-grid { grid-template-columns: 1fr; }
}
</style>
