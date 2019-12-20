/**
 * 处理httponlycookie
 * @param {*} cookiename 需要去验证的cookie名称
 */
export function doesHttpOnlyCookie (cookiename) {
  const d = new Date()
  // 设置cookie时间 为1秒后失效
  d.setTime(d.getTime() + (1000))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cookiename}=new_value;path=/;${expires}`

  // 如果设置完当前cookie以后通过检测 检测不出来刚设置的cookie 就代表当前这个cookie设置了httponly 并且没有失效
  if (!document.cookie.includes(`${cookiename}=`)) {
    return true
  }

  // 检测有新设置的这个cookie删除它
  d.setTime(d.getTime() - (2000))
  const expiresRemove = `expires=${d.toUTCString()}`
  document.cookie = `${cookiename}=new_value;path=/;${expiresRemove}`
  return false
}

/**
 * 获取cookie信息
 */
export function getCookie () {
  const cookieList = document.cookie.split(';')
  const cookieObj = {}
  for (const item of cookieList) {
    const cookieKeyVal = item.trim().split('=')
    cookieObj[cookieKeyVal[0]] = cookieKeyVal[1]
  }
  return cookieObj
}

/**
 * 判断是否还有子代
 * @param {Array} item 判断元素
 */
export function hasChild (item) {
  return item.children && item.children.length !== 0
}

/**
 * 通过路由列表得到菜单列表
 * @param {Array} list 路由列表
 */
export function getMenuByRouter (list) {
  let res = []
  list.forEach(item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item)) {
        obj.children = getMenuByRouter(item.children)
      }
      res.push(obj)
    }
  })
  return res
}

/**
 * 通过路由列表得到缓存列表
 * @param {Array} list 路由列表
 */
export function getCacheRouter (list) {
  let res = []
  list.forEach(item => {
    if (hasChild(item)) {
      res = res.concat(getCacheRouter(item.children))
    }
    if (item.meta.cache) res.push(item.name)
  })
  return res
}
