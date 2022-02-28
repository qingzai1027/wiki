
module.exports = [
  {
    // url: '/vue-admin-template/register/getEmailCode',
    url: '/logindemo/register/getEmailCode',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          message: 'success'
        }
      }
    }
  },

  {
    // url: '/vue-admin-template/register\.*',
    url: '/login demo/register\.*',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          message: 'success'
        }
      }
    }
  }
]
