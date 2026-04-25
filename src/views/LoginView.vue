<template>
  <div class="login-page">
    <!-- Animated background -->
    <div class="login-bg">
      <div class="login-bg-orb login-bg-orb--1"></div>
      <div class="login-bg-orb login-bg-orb--2"></div>
      <div class="login-bg-orb login-bg-orb--3"></div>
      <div class="login-bg-grid"></div>
    </div>

    <div class="login-container">
      <!-- Left: Branding panel -->
      <div class="login-branding">
        <div class="login-branding-content">
          <div class="login-logo">
            <div class="login-logo-icon">
              <span class="material-icons-round">rocket_launch</span>
            </div>
            <h1 class="login-logo-text">
              <span class="gradient-text">BaseWeb</span>
            </h1>
          </div>
          <p class="login-tagline">次世代ダッシュボードで<br>ビジネスを加速させよう</p>
          <div class="login-features">
            <div class="login-feature">
              <span class="material-icons-round">insights</span>
              <span>リアルタイム分析</span>
            </div>
            <div class="login-feature">
              <span class="material-icons-round">security</span>
              <span>高セキュリティ</span>
            </div>
            <div class="login-feature">
              <span class="material-icons-round">speed</span>
              <span>高速パフォーマンス</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Login form -->
      <div class="login-form-panel">
        <div class="login-form-wrapper">
          <div class="login-form-header">
            <h2>おかえりなさい</h2>
            <p>アカウントにログインしてください</p>
          </div>

          <form class="login-form" @submit.prevent="handleLogin" id="login-form">
            <!-- Email field -->
            <div class="form-group" :class="{ 'form-group--focused': emailFocused, 'form-group--filled': email }">
              <label for="login-email" class="form-label">
                <span class="material-icons-round">mail</span>
                メールアドレス
              </label>
              <input
                id="login-email"
                v-model="email"
                type="email"
                class="form-input"
                placeholder="you@example.com"
                autocomplete="email"
                @focus="emailFocused = true"
                @blur="emailFocused = false"
              />
            </div>

            <!-- Password field -->
            <div class="form-group" :class="{ 'form-group--focused': passwordFocused, 'form-group--filled': password }">
              <label for="login-password" class="form-label">
                <span class="material-icons-round">lock</span>
                パスワード
              </label>
              <div class="form-input-wrapper">
                <input
                  id="login-password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  @focus="passwordFocused = true"
                  @blur="passwordFocused = false"
                />
                <button
                  type="button"
                  class="form-input-toggle"
                  id="toggle-password"
                  @click="showPassword = !showPassword"
                  tabindex="-1"
                >
                  <span class="material-icons-round">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Remember me & Forgot password -->
            <div class="form-options">
              <label class="form-checkbox" for="remember-me">
                <input id="remember-me" v-model="rememberMe" type="checkbox" />
                <span class="form-checkbox-mark"></span>
                ログイン状態を保持
              </label>
              <a href="#" class="form-link" id="forgot-password">パスワードを忘れた方</a>
            </div>

            <!-- Error message -->
            <transition name="slide">
              <div v-if="authStore.loginError" class="form-error" id="login-error">
                <span class="material-icons-round">error</span>
                {{ authStore.loginError }}
              </div>
            </transition>

            <!-- Submit button -->
            <button
              type="submit"
              class="login-btn"
              id="login-submit"
              :disabled="authStore.isLoading"
            >
              <span v-if="authStore.isLoading" class="login-btn-loader">
                <span class="material-icons-round spin">progress_activity</span>
                ログイン中...
              </span>
              <span v-else class="login-btn-content">
                <span class="material-icons-round">login</span>
                ログイン
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="login-divider">
            <span>または</span>
          </div>

          <!-- Social login buttons -->
          <div class="social-login">
            <button class="social-btn" id="login-google" type="button">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button class="social-btn" id="login-github" type="button">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2.16 2.16 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.74.74 1.2 1.74 1.2 2.84 0 4.31-2.58 5.23-5.06 5.5.45.37.82.92.82 2.02v3.03c0 .27.18.64.73.55A11 11 0 0012 1.27"/>
              </svg>
              GitHub
            </button>
          </div>

          <p class="login-footer">
            アカウントをお持ちでない方は
            <a href="#" class="form-link" id="signup-link">新規登録</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const emailFocused = ref(false)
const passwordFocused = ref(false)

async function handleLogin() {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
/* ============================================
   Login Page Layout
   ============================================ */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: var(--space-4);
}

/* ============================================
   Animated Background
   ============================================ */
.login-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.login-bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: orbFloat 20s ease-in-out infinite;
}

.login-bg-orb--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%);
  top: -10%;
  left: -5%;
  animation-delay: 0s;
}

.login-bg-orb--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%);
  bottom: -10%;
  right: -5%;
  animation-delay: -7s;
}

.login-bg-orb--3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(244, 114, 182, 0.25), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

.login-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -40px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(15px, 30px) scale(1.02); }
}

/* ============================================
   Login Container
   ============================================ */
.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  max-width: 960px;
  min-height: 580px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background: rgba(26, 32, 53, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--color-border);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
  animation: containerAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes containerAppear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ============================================
   Branding Panel (Left)
   ============================================ */
.login-branding {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-10);
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
}

.login-branding::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.12), transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.08), transparent 50%);
}

.login-branding-content {
  position: relative;
  z-index: 1;
}

.login-logo {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.login-logo-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-xl);
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-glow);
  animation: float 4s ease-in-out infinite;
}

.login-logo-icon .material-icons-round {
  font-size: 28px;
  color: white;
}

.login-logo-text {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.login-tagline {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-10);
}

.login-features {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.login-feature {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-base);
}

.login-feature:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.login-feature .material-icons-round {
  font-size: 20px;
  color: var(--color-accent-primary-light);
}

/* ============================================
   Form Panel (Right)
   ============================================ */
.login-form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-10);
  background: rgba(10, 14, 26, 0.4);
}

.login-form-wrapper {
  width: 100%;
  max-width: 360px;
}

.login-form-header {
  margin-bottom: var(--space-8);
}

.login-form-header h2 {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.login-form-header p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* ============================================
   Form Elements
   ============================================ */
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.form-label .material-icons-round {
  font-size: 16px;
}

.form-group--focused .form-label {
  color: var(--color-accent-primary-light);
}

.form-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  outline: none;
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  background: rgba(21, 28, 46, 0.8);
}

.form-input-wrapper .form-input {
  padding-right: 44px;
}

.form-input-toggle {
  position: absolute;
  right: var(--space-2);
  padding: var(--space-2);
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.form-input-toggle:hover {
  color: var(--color-text-secondary);
  background: var(--color-surface-2);
}

.form-input-toggle .material-icons-round {
  font-size: 18px;
}

/* ============================================
   Form Options Row
   ============================================ */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  cursor: pointer;
  user-select: none;
}

.form-checkbox input[type="checkbox"] {
  display: none;
}

.form-checkbox-mark {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--color-border-hover);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  position: relative;
}

.form-checkbox input:checked + .form-checkbox-mark {
  background: var(--color-accent-primary);
  border-color: var(--color-accent-primary);
}

.form-checkbox input:checked + .form-checkbox-mark::after {
  content: '';
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
}

.form-link {
  color: var(--color-accent-primary-light);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.form-link:hover {
  color: var(--color-accent-primary);
  text-decoration: underline;
}

/* ============================================
   Error Message
   ============================================ */
.form-error {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: var(--radius-lg);
  color: var(--color-error);
  font-size: var(--font-size-sm);
}

.form-error .material-icons-round {
  font-size: 18px;
  flex-shrink: 0;
}

/* ============================================
   Login Button
   ============================================ */
.login-btn {
  width: 100%;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--gradient-primary);
  background-size: 200% 200%;
  color: white;
  font-size: var(--font-size-base);
  font-weight: 600;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  margin-top: var(--space-2);
}

.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow), var(--shadow-lg);
}

.login-btn:hover:not(:disabled)::before {
  opacity: 1;
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-btn-content,
.login-btn-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.login-btn-content .material-icons-round,
.login-btn-loader .material-icons-round {
  font-size: 20px;
}

.spin {
  animation: spin 1s linear infinite;
}

/* ============================================
   Divider
   ============================================ */
.login-divider {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin: var(--space-6) 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.login-divider::before,
.login-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

/* ============================================
   Social Login
   ============================================ */
.social-login {
  display: flex;
  gap: var(--space-3);
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.social-btn:hover {
  background: var(--color-bg-card);
  border-color: var(--color-border-hover);
  color: var(--color-text-primary);
  transform: translateY(-1px);
}

/* ============================================
   Footer
   ============================================ */
.login-footer {
  margin-top: var(--space-6);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

/* ============================================
   Responsive
   ============================================ */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    max-width: 440px;
    min-height: auto;
  }

  .login-branding {
    padding: var(--space-8) var(--space-6);
  }

  .login-tagline {
    font-size: var(--font-size-base);
    margin-bottom: var(--space-6);
  }

  .login-features {
    display: none;
  }

  .login-form-panel {
    padding: var(--space-8) var(--space-6);
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: var(--space-2);
  }

  .login-branding {
    padding: var(--space-6) var(--space-4);
  }

  .login-form-panel {
    padding: var(--space-6) var(--space-4);
  }

  .login-logo-icon {
    width: 44px;
    height: 44px;
  }

  .login-logo-icon .material-icons-round {
    font-size: 22px;
  }

  .login-logo-text {
    font-size: var(--font-size-2xl);
  }
}
</style>
