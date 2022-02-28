import request from '@/utils/request'

export function getEmailCode(email) {
  return request({
    // url: '/api/auth/getEmailCode?email=' + email,
    url: '/logindemo/register/getEmailCode',
    method: 'post',
    email
  })
}

// export function register(data) {
export function register(code,data) {
  return request({
    // url: '/api/auth/register',
    url: '/logindemo/register?code='+ code,
    method: 'post',
    data
  })
}
