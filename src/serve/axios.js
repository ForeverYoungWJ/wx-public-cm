import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_URL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // todo 全局loading
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
  // 判断错误码 全局loading
  // todo 1、router跳转； 2、toast提示；
  // this.$message.error(data.error.info);
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
  //  todo 网络异常
})

export default {
  request: function (inOpts) {
    const opts = inOpts || {}
    const {url, data} = opts

    return new Promise((resolve, reject) => {
      axios({
        url: url || process.env.VUE_APP_BASE_URL,
        method: 'post',
        headers: {
          // 'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; multipart/form-data'
        },
        dataType: 'json',
        responseType: 'json',
        // withCredentials: true,
        timeout: 10000, // 指定请求超时的毫秒数(0 表示无超时时间)
        data: data,
        transformRequest: [function (e) {
          // 数据转换的核心代码
          function setDate(e) {
            var t, n, i, r, o, s, a, c = "";
            for (t in e)
              if (n = e[t], n instanceof Array)
                for (a = 0; a < n.length; ++a)
                  o = n[a], i = t + "[" + a + "]", s = {}, s[i] = o, c += setDate(s) + "&";
              else if (n instanceof Object)
                for (r in n) o = n[r], i = t + "[" + r + "]", s = {}, s[i] = o, c += setDate(s) + "&";
              else void 0 !== n && null !== n && (c += encodeURIComponent(t) + "=" + encodeURIComponent(n) + "&");
            return c.length ? c.substr(0, c.length - 1) : c
          }

          // 数据转换的核心代码结束
          return setDate(e)
        }]
      }).then(
        (response) => {
          resolve(response.data)
        }
      ).catch(
        (error) => {
          reject(error)
        }
      ).finally(() => {
      })
    })
  }
}
