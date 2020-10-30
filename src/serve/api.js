import banner from './uat/banner'

let api

api = {
  ...banner
}

if (process.env.VUE_APP_CURRENTMODE === 'mock') {
  api = require('./mock/mock').default
}

export default api
