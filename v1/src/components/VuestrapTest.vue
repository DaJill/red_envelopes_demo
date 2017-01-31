<template>
  <div>
  <!-- {{tabChangeByRoutePath()}} -->
    <p class="title">紅包優惠</p>
    <div class="tabs is-boxed is-info">
    <ul>
      <li v-for="tabEL in tabELs" v-on:click="tabChangeByClick(tabEL)" :class="tabEL.classObj">
        <router-link :to="tabEL.link">
          <span :class="tabEL.link">{{tabEL.tab_name}}</span>
        </router-link>
      </li>
    </ul>
    </div>
    <router-view :msg="msg"></router-view>
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
  beforeMount () { // document ready
    this.tabChangeByRoutePath()
  },
  methods: {
    tabChangeByClick: function (targeTab) {
      for (var id in this.tabELs) {
        this.tabELs[id].classObj['is-active'] = false
      }
      targeTab.classObj['is-active'] = true
    },
    tabChangeByRoutePath: function () {
      for (var id in this.tabELs) {
        this.tabELs[id].classObj['is-active'] = false
        if (this.tabELs[id]['link'] === this.$route.path) {
          this.tabELs[id].classObj['is-active'] = true
        }
      }
    }
  }
}

</script>