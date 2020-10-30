// let Timestamp = new Date().getTime();
module.exports = {
  // 支持本地浏览
  publicPath: './', //process.env.VUE_APP_BASE_URL,  /vue-h5 指定服务器目录
  assetsDir: 'static',
  lintOnSave: false,
  outputDir: 'web',
  css: {
    loaderOptions: {
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [
          require('postcss-px2rem-exclude')({
            remUnit: 75.0,
            exclude: /node_modules/
          })
        ]
      },
      // 给 sass-loader 传递选项
      sass: {
        prependData: `
          @import "src/styles/_mixin.scss";
        `
      }
    }
  },
  // devServer: {
  //   host: '127.0.0.1', 
  //   port: 8080,
  // },
}
