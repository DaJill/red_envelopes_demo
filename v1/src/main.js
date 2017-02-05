// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import VuestrapTest from './components/VuestrapTest'
import Hello from './components/Hello'
import CorporateEvents from './components/CorporateEvents'
import HallEvents from './components/HallEvents'
import Tools from './components/Tools'

import EventsRedEnvelopeMain from './components/events/red_envelope/Main'
import EventsRedEnvelopeCorporate from './components/events/red_envelope/Corporate'
import EventsRedEnvelopeHall from './components/events/red_envelope/Hall'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
var router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: VuestrapTest,
      children: [
        {
          path: 'corporateevents',
          component: CorporateEvents
        },
        {
          path: 'hallevents',
          component: HallEvents
        }
      ]
    },
    {
      path: '/tool/',
      component: Tools
    },
    {
      path: '/hello/',
      component: Hello
    },
    {
      path: '/event/red_envelope/',
      component: EventsRedEnvelopeMain,
      children: [
        {
          name: 'corporate',
          path: 'corporate',
          component: EventsRedEnvelopeCorporate
        },
        {
          name: 'hall',
          path: 'hall',
          component: EventsRedEnvelopeHall
        }
      ]

    }
    // {
    //   path: '/event/set/corporate',
    //   component: SetCorporate
    // },
    // {
    //   path: '/event/set/hall',
    //   component: SetHall
    // },
  ]
})
// var router = new VueRouter()
// router.map({
//   '/corporateevents': {
//     component: CorporateEvents
//   },
//   '/hallevents': {// beforeRouteEnter (to, from, next)
        // {
        // // 在渲染该组件的对应路由被 confirm 前调用
        // // 不！能！获取组件实例 `this`
        // // 因为当钩子执行前，组件实例还没被创建
        // console.log('beforeRouteEnter:to', to)
        // console.log('beforeRouteEnter:from', from)
        // console.log('beforeRouteEnter:next', next)
        // },
        // beforeRouteUpdate (to, from, next) {
        //   // 在当前路由改变，但是改组件被复用时调用
        //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        //   // 可以访问组件实例 `this`
        //   console.log('beforeRouteUpdate:to', to)
        //   console.log('beforeRouteUpdate:from', from)
        //   console.log('beforeRouteUpdate:next', next)
        // },
        // beforeRouteLeave (to, from, next) {
        //   // 导航离开该组件的对应路由时调用
        //   // 可以访问组件实例 `this`
        //   console.log('beforeRouteLeave:to', to)
        //   console.log('beforeRouteLeave:from', from)
        //   console.log('beforeRouteLeave:next', next)
        // }
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
