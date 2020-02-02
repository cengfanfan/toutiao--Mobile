import request from '../utils/request'

export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const Verification = data => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${data}`
  })
}
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
export const getAppointUser = (id) => {
  return request({
    method: 'get',
    url: `/app/v1_0/users/${id}`
  })
}
