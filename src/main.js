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
import global from './assets/js/global.js'//引用全局变量文件
import yjpdEchart from './assets/js/yjpdEchart.js'//引用yjpdEchart文件
import VueParticles from 'vue-particles'


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
import userPanel from './components/page/userPanel.vue'
Vue.component('userPanel-page', userPanel)
import warnvaluePanel from './components/page/warnvaluePanel.vue'
Vue.component('warnvaluePanel-page', warnvaluePanel)

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '8LPl96uimMBx8O9MTjbTjVUEU6i4gDvj'
})

// Vue.component('LeftChart1', LeftChart1)
// import LeftChart1 from './views/home/monitoringmodule/LeftChart1.vue'
// Vue.component('LeftChart2', LeftChart2)
// import LeftChart2 from './views/home/monitoringmodule/LeftChart2.vue'
// Vue.component('LeftChart3', LeftChart3)
// import LeftChart3 from './views/home/monitoringmodule/LeftChart3.vue'
// Vue.component('RightChart1', RightChart1)
// import RightChart1 from './views/home/monitoringmodule/RightChart1.vue'
// Vue.component('RightChart2', RightChart2)
// import RightChart2 from './views/home/monitoringmodule/RightChart2.vue'
// Vue.component('RightChart3', RightChart3)
// import RightChart3 from './views/home/monitoringmodule/RightChart3.vue'
// Vue.component('CenterCmp', CenterCmp)
// import CenterCmp from './views/home/monitoringmodule/CenterCmp.vue'
// Vue.component('BottomCharts', BottomCharts)
// import BottomCharts from './views/home/monitoringmodule/BottomCharts.vue'

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
//import pdf from 'vue-pdf'

Vue.prototype.api = api;
Vue.prototype.http = http;
Vue.prototype.yjpdEchart = yjpdEchart;
Vue.prototype.$axios = axios;
Vue.prototype.$querystring = querystring;
Vue.prototype.$echarts = echarts
Vue.use(VueResource)
Vue.use(animated)
Vue.use(VueParticles)
//Vue.use(pdf)

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