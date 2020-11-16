import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/longin.vue'
import NotPermission from '../components/401.vue'
import jcxt from '../components/page/jcxt.vue'
import home from '../components/common/home.vue'
import welcome from '../components/gcgk/welcome.vue'

Vue.use(VueRouter)
const routes = [
    {
      path: '/', /* 默认跳转到登录界面 */
      redirect: {path: '/login'},
    },
    {
      path: '/login', /* 登录界面 */
      name: 'login',
      meta:{title: ' 用户登录'},
      component: login/* ,hidden: true, // 自定义属性，在组件中可以通过 this.$route.hidden 获取值 */
    },
    {
      path: '/home',
      name: 'home',
      meta:{title: '设备管理'},
      component: home,
      children: [{
        path: '/jcxt',
        component: jcxt
      }, {
        path: '/welcome',
        component: welcome
      }
      // children: [{
      //   path: '/jcxt',
      //   component: jcxt
      // }, {
      //   path: '/welcome',
      //   component: welcome
      // }
    ]
    },
    {
      path: "/401",
      component: NotPermission
    }
  ]



  const router = new VueRouter({
    mode: 'hash',
    //base: process.env.BASE_URL,
    routes
  })
  //路由导航守卫
router.beforeEach((to, from, next) => {

  const token = window.localStorage.getItem('JWT_TOKEN');
  if (to.path == '/login') {
    if(!token){
      return next();
    }else{
      return next({path: '/home'})
    }
  }

  if(to.path=='/401'){
	  return next();
  }

    //判断是否有访问该路径的权限
    //const urls =store.state.userInfo.url;
    //如果是管理员
    //if(store.state.userInfo.isAdmin){
     //  return next();
    //}else{
      //if(urls.indexOf(to.path) > -1){
        //则包含该元素
        window.sessionStorage.setItem("activePath", to.path);
        return next();
     // }else{
     //   return next("/401");
      //}


})
import store from '../store'//引入store


export default router

