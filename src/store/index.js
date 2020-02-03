import Vue from 'vue'
import Vuex from 'vuex'

import routers from '@/router/routers'
import { getMenuByRouter, getCacheRouter } from '@/utils/utils'
import { DEV_BASEURL, DEV_IMG_BASEURL, PROD_BASEURL, PROD_IMG_BASEURL } from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? DEV_BASEURL : PROD_BASEURL
const imgBaseUrl = process.env.NODE_ENV === 'development' ? DEV_IMG_BASEURL : PROD_IMG_BASEURL

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // *用户信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // *请求路径
    baseUrl: baseUrl,
    // *图片路径
    baseImgUrl: imgBaseUrl,
    // *菜单列表
    menuList: getMenuByRouter(routers),
    // *缓存列表
    cacheList: getCacheRouter(routers),
    // *激活菜单的name值
    routerActiveName: null,
    // *展开菜单的集合
    routerOpenNames: [],
    // *面包屑列表
    breadCrumbList: []
  },
  getters: {
    baseUrl: (state) => state.baseUrl,
    baseImgUrl: (state) => state.baseImgUrl,
    menuList: (state) => state.menuList,
    cacheList: (state) => state.cacheList,
    routerActiveName: (state) => state.routerActiveName,
    routerOpenNames: (state) => state.routerOpenNames,
    breadCrumbList: (state) => state.breadCrumbList
  },
  mutations: {
    setUserInfo (state, data) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      state.userInfo = data
    },
    exit (state) {
      localStorage.removeItem('userInfo')
      state.userInfo = {}
    },
    setRouterActive (state, data) {
      state.routerActiveName = data.name
      state.routerOpenNames = [data.matched[0].name]
      state.breadCrumbList = data.matched.filter(v => !v.meta.hideInBread)
        .map(v => { return { icon: v.meta.icon, title: v.meta.title } })
    }
  },
  actions: {
  },
  modules: {
  }
})
