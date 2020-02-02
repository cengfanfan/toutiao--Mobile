import request from '../utils/request'
export const getArticle = (userId, params) => {
  return request({
    method: 'get',

    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}
export const getChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'

  })
}
export const getArticlesByChannel = (params) => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
export const getTitleBySearch = (params) => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params
  })
}
export const getSearchResult = (params) => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
export const getHistoryBySearch = () => {
  return {
    method: 'get',
    url: '/app/v1_0/search/histories'
  }
}
