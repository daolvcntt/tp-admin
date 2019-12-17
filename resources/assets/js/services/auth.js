import Ls from './ls'
import {
  forEach
} from 'lodash'
export default {
  async login(loginData) {
    try {
      let response = await axios.post('login', {
        username: loginData.email,
        password: loginData.password
      })

      Ls.set('auth.token', response.data.access_token)
      if (response.data.access_token) {
        let res = await axios.get('profile?include=roles')
        if (res.data.data.roles) {
          // console.log(response.data.data.roles)
          forEach(res.data.data.roles.data, role => {
            // console.log(role);
            Ls.set('auth.currentRole', role.slug)
          })
        }
      }
      toastr['success']('Logged In!', 'Success')
      // this.getProfile().then(result => {
      //   this.role = result.currentRole.slug
      // })
      // console.log(role)
      let accessToken = response.data.access_token
      return accessToken
    } catch (error) {
      if (error.response.status === 401) {
        toastr['error']('Invalid Credentials', 'Error')
      } else {
        // console.log(error.response.data.data)
        toastr['error'](error.response.data.data.errors[0], 'Error')
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message)
      }
    }
  },

  async logout() {
    try {
      // await axios.get('logout')

      Ls.remove('auth.token')
      Ls.remove('auth.currentRole')
      toastr['success']('Logged out!', 'Success')
    } catch (error) {
      // console.log('Error', error.message)
    }
  },

  async check() {
    // let response = Ls.get('auth.token')
    // console.log(response)
    let currentRole = Ls.get('auth.currentRole')
    return currentRole
  },
  //Lấy danh sách các permissions của người đăng nhập hiện tại
  async getProfile() {
    try {
      let response = await axios.get('profile?include=roles')
      if (response.data.data.roles) {
        // console.log(response.data.data.roles)
        let permissions = {}
        let currentRole = {}
        forEach(response.data.data.roles.data, role => {
          // console.log(role)
          currentRole = role
          permissions = {
            ...permissions,
            ...role.permissions
          }
        })
        return {
          permissions,
          currentRole
        }
      }
    } catch (error) {
      // console.log('Error', error.message)
    }
  },

  async getCurrentUser() {
    try {
      let response = await axios.get('profile')
      return response.data.data
      // console.log(response.data.data)
    } catch (error) {
      // console.log('Error: ', error.message)
    }
  },

  //Check phân quyền của user đối với từng hành động
  async canAccess(permissions, per) {
    if (permissions['admin.super-admin'] || permissions[per]) {
      return true
    }
    return false
  }
}
