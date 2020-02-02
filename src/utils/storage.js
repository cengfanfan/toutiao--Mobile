export const setToken = (name, value) => {
  window.localStorage.setItem(name, typeof value === 'object' ? JSON.stringify(value) : value)
}
export const getToken = name => {
  try {
    return JSON.parse(window.localStorage.getItem(name))
  } catch (err) {
    console.log('获取错误的token', err)
    return window.localStorage.getItem(name)
  }
}
export const removeToken = name => {
  window.localStorage.removeItem(name)
}
