<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          请输入访问码
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="access-code" class="sr-only">访问码</label>
            <input
              id="access-code"
              v-model="accessCode"
              name="access-code"
              type="text"
              required
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="请输入访问码"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ loading ? '验证中...' : '验证访问码' }}
          </button>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_ENDPOINTS } from '../config/api'

const router = useRouter()
const accessCode = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(API_ENDPOINTS.VERIFY_ACCESS_CODE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ accessCode: accessCode.value }),
    })

    const data = await response.json()

    if (response.ok) {
      // 存储访问令牌
      localStorage.setItem('accessToken', data.token)
      localStorage.setItem('expiresAt', data.expiresAt)
      router.push('/resume')
    } else {
      error.value = data.message || '访问码无效'
    }
  } catch (err) {
    error.value = '验证失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script> 