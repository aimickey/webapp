import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePointsStore = defineStore('points', () => {
  const MAX_POINTS = 10

  // Load from localStorage
  const savedPoints = parseInt(localStorage.getItem('user_points') || '0', 10)
  const savedHistory = JSON.parse(localStorage.getItem('coupon_history') || '[]')

  const currentPoints = ref(Math.min(savedPoints, MAX_POINTS))
  const couponHistory = ref(savedHistory)
  const showCouponModal = ref(false)
  const selectedCoupon = ref(null)
  const lastExchangedCoupon = ref(null)

  const maxPoints = MAX_POINTS
  const isFull = computed(() => currentPoints.value >= MAX_POINTS)
  const progressPercent = computed(() => (currentPoints.value / MAX_POINTS) * 100)

  const coupons = [
    {
      id: 1,
      name: 'コーヒー無料券',
      description: 'お好きなコーヒー1杯が無料に！',
      icon: 'coffee',
      cost: 5,
      store: 'セブン-イレブン',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    },
    {
      id: 2,
      name: 'おにぎり100円引き',
      description: 'おにぎり各種が100円引き',
      icon: 'rice_bowl',
      cost: 3,
      store: 'ローソン',
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    },
    {
      id: 3,
      name: 'スイーツ半額',
      description: 'お好きなスイーツ1品が半額',
      icon: 'cake',
      cost: 7,
      store: 'ファミリーマート',
      color: '#f472b6',
      gradient: 'linear-gradient(135deg, #f472b6, #ec4899)',
    },
    {
      id: 4,
      name: 'お弁当200円引き',
      description: 'お弁当各種が200円引き',
      icon: 'lunch_dining',
      cost: 8,
      store: 'セブン-イレブン',
      color: '#34d399',
      gradient: 'linear-gradient(135deg, #34d399, #10b981)',
    },
    {
      id: 5,
      name: 'ドリンク1本無料',
      description: '対象ドリンク1本が無料',
      icon: 'local_drink',
      cost: 10,
      store: '全コンビニ共通',
      color: '#fbbf24',
      gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    },
  ]

  function saveToStorage() {
    localStorage.setItem('user_points', currentPoints.value.toString())
    localStorage.setItem('coupon_history', JSON.stringify(couponHistory.value))
  }

  function addPoint() {
    if (currentPoints.value < MAX_POINTS) {
      currentPoints.value++
      saveToStorage()
      return true
    }
    return false
  }

  function canExchange(coupon) {
    return currentPoints.value >= coupon.cost
  }

  function exchangeCoupon(coupon) {
    if (canExchange(coupon)) {
      currentPoints.value -= coupon.cost
      const record = {
        id: Date.now(),
        couponName: coupon.name,
        store: coupon.store,
        date: new Date().toLocaleDateString('ja-JP'),
        cost: coupon.cost,
      }
      couponHistory.value.unshift(record)
      lastExchangedCoupon.value = coupon
      saveToStorage()
      return true
    }
    return false
  }

  function openCouponModal(coupon) {
    selectedCoupon.value = coupon
    showCouponModal.value = true
  }

  function closeCouponModal() {
    showCouponModal.value = false
    selectedCoupon.value = null
    lastExchangedCoupon.value = null
  }

  return {
    currentPoints,
    maxPoints,
    isFull,
    progressPercent,
    coupons,
    couponHistory,
    showCouponModal,
    selectedCoupon,
    lastExchangedCoupon,
    addPoint,
    canExchange,
    exchangeCoupon,
    openCouponModal,
    closeCouponModal,
  }
})
