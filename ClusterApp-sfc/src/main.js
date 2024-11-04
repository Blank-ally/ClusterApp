import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const Cluster = createApp(App)

Cluster.use(router)


import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
//import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js


Cluster.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
Cluster.mount('#app')