import {sync} from './components/sync'

import(/* webpackChunkName: 'async-test' */ './components/async').then(elem => {
  elem.default.init()
})

window.console.log(sync())