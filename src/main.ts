import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Buefy)

app.mount('#app')
