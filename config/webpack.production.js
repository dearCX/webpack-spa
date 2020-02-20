const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const os = require('os')
module.exports = {
  output: {
    filename: 'scripts/[name].[hash:5].bundles.js',
    publicPath: '/'
  },
  // optimization: {
  //   // 启用多核uglifyjs-webpack-plugin
  //   minimizer: [new UglifyJsPlugin({
  //     // 开启多核压缩
  //     parallel: true
  //     // 默认核数减1，以下配置代表开启全部的核数
  //     // parallel: os.cpus().length
  //   })],
  // }
  plugins: [
    new ParallelUglifyPlugin({
      // test,
      exclude: /\.min\.js$/, //或者 parallel: true,
      // include,
      // cacheDir: '',
      workerCount: os.cpus().length,
      // sourceMap: false,
      // uglifyJS: {},
      uglifyES: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true
        }
      }
    })
  ]
}