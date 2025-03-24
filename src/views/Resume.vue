<template>
  <div class="fixed top-4 right-4 flex space-x-4">
    <button @click="toggleLocale" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600">
      {{ $i18n.locale === 'en' ? 'English' : '简体中文' }}
    </button>
    <button @click="downloadPDF" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      {{ isGenerating ? '生成中...' : $t('下载简历 PDF') }}
    </button>
  </div>

  <div class="container mx-auto py-8 px-8 max-w-4xl bg-white" ref="resumeRef">
    <header class="mb-8">
      <h1 class="text-4xl text-center font-bold text-gray-800 mb-2">{{ $t('王力宏') }}</h1>
      <p class="text-xl text-center text-gray-600 mb-4">{{ $t('这是一段介绍') }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 border-t border-b border-gray-300 py-4">
        <span class="flex items-center">
          <i class="fas fa-map-marker-alt mr-2"></i> {{ $t('地址') }}
        </span>
        <span class="flex items-center">
          <i class="fas fa-phone mr-2"></i> (555) 123-4567
        </span>
        <span class="flex items-center">
          <i class="fas fa-envelope mr-2"></i> john.doe@gmail.com
        </span>
        <span class="flex items-center">
          <i class="fas fa-globe mr-2"></i> https://johndoe.me/
        </span>
      </div>
    </header>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">{{ $t('简介') }}</h2>
      <div class="flex space-x-6 place-content-center ">
        <a href="#" class="flex items-center text-blue-600 hover:underline" target="_blank">
          <i class="fab fa-linkedin mr-1"></i> LinkedIn
        </a>
        <a href="https://github.com/sakana9826" class="flex items-center text-blue-600 hover:underline" target="_blank">
          <i class="fab fa-github mr-1"></i> GitHub
        </a>
        <a href="#" class="flex items-center text-blue-600 hover:underline">
          <i class="fab fa-stack-overflow mr-1"></i> StackOverflow
        </a>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">{{ $t('总结') }}</h2>
      <p class="text-gray-700">
        <p v-html="$t('个人总结')"></p>
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">{{ $t('经验') }}</h2>
      <div class="mb-4">
        <div class="flex justify-between items-baseline">
          <h3 class="text-xl font-semibold">{{ $t('某家公司的名称') }}</h3>
          <span class="text-gray-600">{{ $t('2019-2030') }}</span>
        </div>
        <div class="flex justify-between items-baseline">
          <p class="text-lg text-gray-700">{{ $t('担任职位xxx产品经理') }}</p>
          <p class="text-gray-600 mb-2">{{ $t('公司地址上海北京') }}</p>
        </div>
        <a href="https://creativesolutions.inc/" class="text-blue-600 hover:underline">
          <i class="fas fa-link mr-1"></i>https://creativesolutions.inc/
        </a>
        <ul class="list-disc list-inside mt-2">
          <li>{{ $t('工作描述一') }}</li>
          <li>{{ $t('工作描述二') }}</li>
          <li>{{ $t('工作描述三') }}</li>
        </ul>
      </div>
      <!-- Add more experience entries here -->
    </section>

    <!-- Add Education, Projects, Skills, Certifications, and Languages sections here -->

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">{{ $t('参考文献') }}</h2>
      <p>{{ $t('想加就加') }}</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">{{ $t('教育经历') }}</h2>
      <p>{{ $t('1974年，第一次在东南亚打自由搏击就赢得了冠军') }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const resumeRef = ref<HTMLElement | null>(null)
const isGenerating = ref(false)

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}

const downloadPDF = async () => {
  if (!resumeRef.value || isGenerating.value) return
  
  isGenerating.value = true

  try {
    const element = resumeRef.value.cloneNode(true) as HTMLElement
    // 移除不需要的按钮
    const buttons = element.getElementsByTagName('button')
    while (buttons.length > 0) {
      buttons[0].remove()
    }

    const opt = {
      margin: [15, 15] as [number, number],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: true,
        width: 1024,
        windowWidth: 1024,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' as const
      }
    }

    await html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('PDF生成失败:', error)
  } finally {
    isGenerating.value = false
  }
}
</script>

<style>
.container {
  min-height: 297mm;  /* A4 height */
  width: 210mm;       /* A4 width */
  margin: 0 auto;
  padding: 20mm;
  box-sizing: border-box;
}

@media print {
  .container {
    margin: 0;
    padding: 20mm;
    width: 210mm;
    min-height: 297mm;
  }
}
</style>