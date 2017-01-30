// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import VuestrapTest from './components/VuestrapTest'
import CorporateEvents from './components/CorporateEvents'
import HallEvents from './components/HallEvents'
Vue.use(VueRouter)
Vue.use(VueResource)
var router = new VueRouter({
  mode: 'history',
  base: __dirname,
  props: ['msg'],
  routes: [
    {
      path: '/',
      component: VuestrapTest,
      children: [
        { path: 'corporateevents', component: CorporateEvents },
        { path: 'hallevents', component: HallEvents }
      ]
    }
  ]
})
// var router = new VueRouter()
// router.map({
//   '/corporateevents': {
//     component: CorporateEvents
//   },
//   '/hallevents': {
//     component: HallEvents
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<router-view />',
  components: { App }
})
