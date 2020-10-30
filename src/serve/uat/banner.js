import axios from '../axios'

export default {
  getBannerList (data) {
    return axios.request({
      cmd: '',
      data: data
    })
  }
}
