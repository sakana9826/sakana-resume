import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import AccessCode from '../views/AccessCode.vue'
import Resume from '../views/Resume.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'AccessCode',
      component: AccessCode
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = localStorage.getItem('accessToken')
  const expiresAt = localStorage.getItem('expiresAt')
  
  // 检查是否有有效的访问令牌
  const hasValidToken = token && expiresAt && new Date().getTime() < new Date(expiresAt).getTime()
  
  // 如果访问根路径且有有效令牌，直接跳转到简历页面
  if (to.path === '/' && hasValidToken) {
    next({ path: '/resume' })
    return
  }
  
  // 如果访问简历页面但没有有效令牌，跳转到访问码页面
  if (to.path === '/resume' && !hasValidToken) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expiresAt')
    next({ path: '/' })
    return
  }
  
  next()
})

export default router 