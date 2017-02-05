<template>
  <div>
  <!-- {{tabChangeByRoutePath()}} -->
    <p class="title">紅包優惠</p>
    <div class="tabs is-boxed is-info">
    <ul>
      <li v-for="tabEL in tabELs" :class="tabEL.classObj">
        <!-- <router-link :to="tabEL.link"> -->
        <router-link :to="{path: tabEL.link}">
          <span>{{tabEL.tab_name}}</span>
        </router-link>
      </li>
    </ul>
    </div>
    <router-view v-on:sendPath="tabChange" :msg="msg"></router-view>

  </div>

</template>

<script>
export default {
  name: 'vuestraptest',
  data () {
    return {
      classObject: {
        active: false,
        'is-active': true
      },
      tabELs: {
        1: {
          'link': '/corporateevents',
          'tab_name': '公司活動',
          classObj: { 'is-active': true }
        },
        2: {
          'link': '/hallevents',
          'tab_name': '廳主活動',
          classObj: { 'is-active': false }
        }
      },
      msg: 'feel so good!'
    }
  },
  methods: {
    tabChange: function (_sRoute) {
      for (var id in this.tabELs) {
        this.tabELs[id].classObj['is-active'] = false
        if (this.tabELs[id]['link'] === _sRoute) {
          this.tabELs[id].classObj['is-active'] = true
        }
      }
    }
  },
  created () { // 建制完以後就會執行以下
    console.log(this)
  }
}

</script>