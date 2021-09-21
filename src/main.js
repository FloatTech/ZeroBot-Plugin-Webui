import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'





const app = createApp(App).use(router)
installElementPlus(app)
app.use(router).mount('#app')