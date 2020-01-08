import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './request/api/'

import '@/plugin/iview'

Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    // *全局图片加载失败的处理
    window.addEventListener('error', function (e) {
      const tagName = e.target.tagName
      const tagSrc = e.target.src
      const times = Number(e.target.dataset.times) || 0
      const allTimes = 3
      if (tagName.toUpperCase() === 'IMG') {
        if (times >= allTimes) {
          e.target.src = require(`@/assets/images/emoticon/image_emoticon${Math.floor(Math.random() * 33) + 1}.png`)
        } else {
          e.target.dataset.times = times + 1
          e.target.src = tagSrc
        }
      }
    }, true)
  }
}).$mount('#admin')
