import './assets/styles/main.scss'

import Vue from 'vue'

import Notifications from 'vue-notification'
import ToolTip from 'v-tooltip'
import Logger from './plugins/log'
import Client from './plugins/neko'
import Axios from './plugins/axios'
import Swal from './plugins/swal'
import Anime from './plugins/anime'

import { i18n } from './plugins/i18n'
import router from './routes/index';
import store from './store'
import app from './app.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Logger)
Vue.use(Notifications)
Vue.use(ToolTip)
Vue.use(Axios)
Vue.use(Swal)
Vue.use(Anime)
Vue.use(Client)
Vue.use(VueRouter);

new Vue({
  i18n,
  store,
  render: (h) => h(app),
  router: router,
  created() {
    const click = () => {
      this.$accessor.setActive()
      if (this.$accessor.settings.autoplay && this.$accessor.video.playing) {
        this.$accessor.video.setMuted(false)
      }
      window.removeEventListener('click', click, false)
    }
    window.addEventListener('click', click, false)

    this.$client.init(this)
    this.$accessor.initialise()
  },
}).$mount('#neko')
