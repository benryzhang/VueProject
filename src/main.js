import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
//import './assets/css/custom.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import 'element-ui/lib/theme-chalk/display.css'
import animated from 'animate.css'
import echarts from 'echarts'
import global from './assets/js/global.js'//引用文件
import qs from 'qs'
import { hasPermission } from './assets//js/permissionDirect'

import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
Vue.prototype.GLOBAL = global//挂载到Vue实例上面
import moment from 'moment'
Vue.prototype.$moment = moment
const Plugins = [ hasPermission ]

import jcxtAddorEdit from './components/page/jcxtAddorEdit.vue'
Vue.component('jcxtAddorEdit-page', jcxtAddorEdit)
import jcxtChannel from './components/page/jcxtChannel.vue'
Vue.component('jcxtChannel-page', jcxtChannel)
import jcxtChannelcont from './components/page/jcxtChannelcont.vue'
Vue.component('jcxtChannelcont-page', jcxtChannelcont)

import detectionPanel from './components/page/detectionPanel.vue'
Vue.component('detectionPanel-page', detectionPanel)
import standardPanel from './components/page/standardPanel.vue'
Vue.component('standardPanel-page', standardPanel)
//import jcxtChannel from './components/page/jcxtChannel.vue'
//Vue.component('jcxtChannel-page', jcxtChannel)
//import './oracl/oracledb.js'


// 自定义的全局组件
//import Notification from '@/components/notification'

// 国际化
//import i18n from './lang'
// 全局权限检查
//import './permission'
// 全局图标
//import './icons'

import axios from 'axios'
//引入两个文件
import api from './api/api.js'
import http from './api/http.js'
import VueResource from 'vue-resource'
import querystring from 'querystring'

Vue.prototype.api = api;
Vue.prototype.http = http;
Vue.prototype.$axios = axios;
Vue.prototype.$querystring = querystring;
Vue.prototype.$echarts = echarts
Vue.use(VueResource)
Vue.use(animated)

// Vue.use(ElementUI, {
//   size: 'medium',
//   i18n: (key, value) => i18n.t(key, value)
// })
//Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')