// import lodash from 'lodash-es' // 函数式编程典范
import { isArray } from 'lodash-es'

import help from '../common/help.js'
console.log('async引用', help.version)

// css的tree-sharing使用purifycss-webpack purify-css
import item from './sync.css'
const sync = () => {
  window.console.log('sync')
  setTimeout(()=>{
    document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello cssnext</h1>`
  }, 4000)
  // document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello cssnext</h1>`
  fetch('/api/test').then(res => res.json()).then(data => {
    console.log('fetch的结果：' + data.msg)
  })
}
// 无法tree-sharking掉scope里面的调用
/* const isArray = (args) => {
  console.log(lodash.isArray(args))
}
*/

// 方式一：推荐插件webpack-deep-scope--plugin深度tree-sharing

// 方式二：解决办法，按需引用
const isArrayFun = (args) => {
  window.console.log(isArray(args))
}

// 魔法注释 webpack magic comments
// import(/* webpackChunkName: 'my-chunk-name' */ '')
export {
  sync,
  isArrayFun
}