import request from '@/utils/request'

export function getList(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: '/logindemo/table/list',
    method: 'get',
    params
  })
}
