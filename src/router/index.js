import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: resolve => require(['@/components/login.vue'], resolve),meta: { keepAlive: true }},
    { path: '/main', component: resolve => require(['@/components/main.vue'], resolve),
      children:[
        {path: '/', redirect: '/zhuye'},
        {path: '/me', component: resolve => require(['@/components/me/me.vue'], resolve),},
        {path: '/zhuye', component: resolve => require(['@/components/zhuye/zhuye.vue'], resolve),meta: { keepAlive: true }},
        {path: '/localtion', component: resolve => require(['@/components/localtion/localtion.vue'], resolve),},
      ]
    },
    {path: '/addcompany', component: resolve => require(['@/components/localtion/addcompany.vue'], resolve),},
    {path: '/personMess', component: resolve => require(['@/components/me/children/personMess.vue'], resolve)},
    {path: '/personWalk', component: resolve => require(['@/components/me/children/personWalk.vue'], resolve)},
    {path: '/companylist', component: resolve => require(['@/components/zhuye/companylist.vue'], resolve),},
    {path: '/companylistchart', component: resolve => require(['@/components/zhuye/companylistchart.vue'], resolve),},
    {path: '/companyItem', component: resolve => require(['@/components/zhuye/companyItem.vue'], resolve)},
    {path: '/setapp', component: resolve => require(['@/components/me/children/setapp.vue'], resolve)},
    {path: '/repwd', component: resolve => require(['@/components/repwd.vue'], resolve)},
    {path: '/compChart', component: resolve => require(['@/components/localtion/children/compChart.vue'], resolve)},
    {path: '/ectypeList', component: resolve => require(['@/components/localtion/children/ectypeList.vue'], resolve)},
    {path: '/ecCompanylist', component: resolve => require(['@/components/localtion/children/ecCompanylist.vue'], resolve)},
  ]
})
