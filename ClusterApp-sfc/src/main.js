import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import quasarIconSet from 'quasar/icon-set/fontawesome-v6'


const Cluster = createApp(App)

Cluster.use(router)


import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

//Import Quasar css
//import 'quasar/vite-plugin/src/css/index.sass'
import 'quasar/dist/quasar.css'

// Assumes your root component is App.vue
// and placed in same folder as main.js


Cluster.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    iconSet: quasarIconSet,
}) // import Quasar plugins and add here

// Assumes you have a <div id="app"></div> in your index.html
Cluster.mount('#app')