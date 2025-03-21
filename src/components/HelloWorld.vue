<template>
  <div>
    <button @click="toggleLocale">{{ $i18n.locale === 'en' ? 'English' : '简体中文' }}</button>
  </div>

  <div class="container mx-auto  py-8 max-w-4xl">
    <header class="mb-8">
      <h1 class="text-4xl text-center font-bold text-gray-800">{{ $t('王力宏') }}</h1>
      <p class="text-xl text-center text-gray-600 mb-4">{{ $t('这是一段介绍') }}</p>
      <div class="flex flex-wrap justify-between text-sm text-gray-600 border-t border-b border-gray-300 py-2">
        <span class="mr-4">
          <i class="fas fa-map-marker-alt mr-1"></i> {{ $t('地址') }}
        </span>
        <span class="mr-4">
          <i class="fas fa-phone mr-1"></i> (555) 123-4567
        </span>
        <span class="mr-4">
          <i class="fas fa-envelope mr-1"></i> john.doe@gmail.com
        </span>
        <span>
          <i class="fas fa-globe mr-1"></i> https://johndoe.me/
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

    <section id="pdf-button" class="mb-8">
      <div class="flex space-x-6 place-content-center">
        <button @click="downloadPDF" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ $t('下载简历 PDF') }}
        </button>
        <button @click="" class="bg-gray-500 text-white px-4 py-2 rounded">
          {{ $t('智能一页（开发中）') }}
        </button>
        <button @click="postData" class="bg-gray-500 text-white px-4 py-2 rounded">
          {{ $t('请求测试') }}
        </button>
        <span>{{ responseMessage }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useI18n } from 'vue-i18n'
import axios, { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

const { locale } = useI18n()

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}

const downloadPDF = () => {
  const element = document.querySelector(".container");
  const pdfButton = document.getElementById("pdf-button");

  if (pdfButton) {
    pdfButton.style.display = "none"
  }

  html2canvas(element as HTMLElement, {scale: 2}).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new JsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width + 400, canvas.height + 400],
    });

    const margin = 200;
    pdf.addImage(imgData, "PNG", margin, margin, canvas.width, canvas.height);
    pdf.save("resume.pdf");
  });

  if (pdfButton) {
    pdfButton.style.display = "block";
  }
};

interface PostData {
  message: string;
  error: string;
}

interface PostReqData {
  password: string;
  email: string;
}

const responseMessage = ref<string>('');

async function postData(): Promise<void> {
  const data: PostReqData = {
    password: 'sam',
    email:"7333@qq.com"
  };

  try {
    const response: AxiosResponse<PostData> = await api.post('/post', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    responseMessage.value = response.data.message
    console.log(response.data);
  } catch (error) {
    const err = error as AxiosError;
    console.error(err.message);
  }
}

// 4. 创建 Axios 实例
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer your-token-here'
  }
});
</script>