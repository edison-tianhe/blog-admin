import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
import { LoadingBar } from 'view-design'

const HOME_NAME = 'home'
const LOGIN_PAGE_NAME = 'login'

Vue.use(Router)
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const userInfo = store.state.userInfo
  const token = userInfo ? userInfo.id : null
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
  document.title = to.meta.title
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
