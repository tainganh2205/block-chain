import axios from 'axios'
import { Cookies } from 'react-cookie'

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
// axios.defaults.baseURL = API_SERVICES_BASE_URL.USER;

// set interceptors requests
axios.interceptors.request.use(
  function (config) {
    if (config && config.url?.indexOf('bscscan') !== -1) {
      return config
    }
    const cookies = new Cookies()
    config.headers['token-authentication'] = cookies.get('user') || null
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// set interceptors responses
axios.interceptors.response.use(
  function (response) {
    return response
  }
  // function (error) {
  //   if (error.toString().indexOf('401') !==a -1) {
  //     _removeCookie('token')
  //     window.location.pathname='/login'
  //   }
  //   return Promise.reject(error);
  // }
)
// end
