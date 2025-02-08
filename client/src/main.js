import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

import './index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

// app.use(ElementPlus, {
//   locale: zhCn
// })

app.use(router)

app.mount('#app')
