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
import store from './store/index'
import app from './app.vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.use(Logger)
Vue.use(Notifications)
Vue.use(ToolTip)
Vue.use(Axios)
Vue.use(Swal)
Vue.use(Anime)
Vue.use(Client)
Vue.use(VueRouter);
Vue.use(Buefy)


new Vue({
  i18n,
  store,
  render: (h) => h(app),
  router: router,
  created() {
    const click = () => {
      this.$accessor.room.setActive()
      if (this.$accessor.room.settings.autoplay && this.$accessor.room.video.playing) {
        this.$accessor.room.video.setMuted(false)
      }
      window.removeEventListener('click', click, false)
    }
    window.addEventListener('click', click, false)

    this.$client.init(this)
    this.$accessor.room.initialise()
  },
}).$mount('#neko')
