import Main from '_c/main'

/**
 * meta: {
 *  title: 显示在侧边栏、面包屑和标签栏的文字
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  showAlways: (default: false) 设为true后如果该路由只有一个子路由，在菜单中也会显示该父级菜单
 *  cache: (false) 设为true后页面在切换标签后会缓存，如果不需要缓存，无需设置这个字段，注意：需要设置页面组件name属性和路由配置的name一致
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      title: '首页',
      icon: 'md-home'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'md-home'
        },
        component: () => import('@/views/home/home.vue')
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    redirect: '/usersList',
    component: Main,
    meta: {
      showAlways: true,
      title: '用户管理',
      icon: 'ios-people'
    },
    children: [
      {
        path: '/usersList',
        name: 'usersList',
        meta: {
          title: '用户管理',
          icon: 'ios-people'
        },
        component: () => import('@/views/users/list.vue')
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    redirect: '/articlesList',
    component: Main,
    meta: {
      showAlways: true,
      title: '文章管理',
      icon: 'ios-bookmarks'
    },
    children: [
      {
        path: '/articlesList',
        name: 'articlesList',
        meta: {
          title: '文章列表',
          icon: 'ios-bookmarks'
        },
        component: () => import('@/views/article/list.vue')
      },
      {
        path: '/articleEdit',
        name: 'articleEdit',
        meta: {
          title: '文章编辑',
          icon: 'ios-brush'
        },
        component: () => import('@/views/article/edit.vue')
      },
      {
        path: '/categoryManage',
        name: 'categoryManage',
        meta: {
          title: '分类管理',
          icon: 'ios-keypad'
        },
        component: () => import('@/views/article/category.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      title: '401',
      hideInMenu: true
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      title: '500',
      hideInMenu: true
    },
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      title: '404',
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  }
]
