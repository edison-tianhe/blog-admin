import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
import { LoadingBar } from 'view-design'

import { doesHttpOnlyCookie } from '@/utils/utils'
import { TITLE, HOME_NAME, LOGIN_PAGE_NAME, TOKEN } from '@/config'

Vue.use(Router)
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const token = doesHttpOnlyCookie(TOKEN)
  if (!token && to.name !== LOGIN_PAGE_NAME) { // 未登录且要跳转的页面不是登录页
    LoadingBar.finish()
    next({ name: LOGIN_PAGE_NAME })
  } else if (!token && to.name === LOGIN_PAGE_NAME) { // 未登陆且要跳转的页面是登录页
    next()
  } else if (token && to.name === LOGIN_PAGE_NAME) { // 已登录且要跳转的页面是登录页
    LoadingBar.finish()
    next({ name: HOME_NAME })
  } else {
    next()
  }
})

router.afterEach(to => {
  document.title = `${TITLE} - ${to.meta.title}`
  store.commit('setRouterActive', to)
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
