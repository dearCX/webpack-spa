const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default // 深度tree-sharing
const PurifyCSSPlugin = require('purifycss-webpack') // css的tree-sharing，不能和style-loader一起使用
const glob = require('glob')
const {join} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const setIterm2Badge = require('set-iterm2-badge')
const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const __mode = argv.mode || 'development'
const __modeflag = (__mode == 'production' ? true : false)
const __mergeConfig = require(`./config/webpack.${__mode}.js`)
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // 正确写法，区别于示例
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin()

const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')

// const DashBoardPlugin = require('webpack-dashboard/plugin')

const setTitle = require('node-bash-title')

const ManifestPlugin = require('webpack-manifest-plugin')

const loading = {
  html: '加载中...'
}

setTitle('connie的窗口')

setIterm2Badge('connie的开发环境')

const webpackConfig = {
  module: {
    /*
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', {
          // loader: 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]'
          loader: 'css-loader?modules'
        }]
      }
    ]
    */
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            // loader: 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]'
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  devServer: { //热更新
    port: 8080,
    hot: true,
    before (app) { //mock数据
      app.get('/api/test', (req,res)=> {
        res.json({
          code: 200,
          msg: '测试数据'
        })
      })
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'common',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new ManifestPlugin(),
    // new DashBoardPlugin(),
    new ProgressBarWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: '项目构建完成',
      // logo: '',
      suppressSuccess: true
    }),
    // new WebpackDeepScopeAnalysisPlugin(),
    new MiniCssExtractPlugin({
      filename: __modeflag?'style/[name].[hash:5].css' : 'style/[name].css',
      chunkFilename: __modeflag?'style/[id].[hash:5].css': 'style/[id].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      loading
    }),
    // css的tree-sharking
    // new PurifyCSSPlugin({
    //   paths: glob.sync(join(__dirname, './dist/*.html'))
    // })
  ]
}

module.exports = smp.wrap(merge(__mergeConfig, webpackConfig))
