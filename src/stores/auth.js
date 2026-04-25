import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('baseweb_authenticated') === 'true')
  const user = ref(JSON.parse(localStorage.getItem('baseweb_user') || 'null'))
  const loginError = ref('')
  const isLoading = ref(false)

  const userDisplayName = computed(() => user.value?.name || 'ゲスト')
  const userEmail = computed(() => user.value?.email || '')
  const userAvatar = computed(() => {
    if (user.value?.name) {
      return user.value.name.charAt(0).toUpperCase()
    }
    return 'G'
  })

  async function login(email, password) {
    loginError.value = ''
    isLoading.value = true

    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Demo authentication - accept any non-empty credentials
    if (!email || !password) {
      loginError.value = 'メールアドレスとパスワードを入力してください'
      isLoading.value = false
      return false
    }

    if (password.length < 4) {
      loginError.value = 'パスワードは4文字以上で入力してください'
      isLoading.value = false
      return false
    }

    // Successful login
    const userData = {
      name: email.split('@')[0],
      email: email,
      loginAt: new Date().toISOString(),
    }

    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('baseweb_authenticated', 'true')
    localStorage.setItem('baseweb_user', JSON.stringify(userData))
    isLoading.value = false
    return true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('baseweb_authenticated')
    localStorage.removeItem('baseweb_user')
  }

  return {
    isAuthenticated,
    user,
    loginError,
    isLoading,
    userDisplayName,
    userEmail,
    userAvatar,
    login,
    logout,
  }
})
