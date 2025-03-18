import { createApp } from 'vue'
import './style.css'
import { createI18n } from 'vue-i18n';
import App from './App.vue'

import translations from './i18n/translations.json';

// 创建 i18n 实例
const i18n = createI18n({
	locale: 'zh', // 默认语言为中文
	fallbackLocale: 'en', // 回退语言为英文
	messages: {
		zh: Object.fromEntries(Object.entries(translations).map(([k]) => [k, k])), // 中文返回键本身
		en: translations // 英文使用 JSON 的值
	}
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
