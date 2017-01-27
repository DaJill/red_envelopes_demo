<template>
  <div>
    <div class="tabs is-boxed is-info">
    <ul>
      <li class="is-active">
        <router-link to="/corporateevents">
          <span>公司活動</span>
        </router-link>
      </li>
      <li>
        <router-link to="/hallevents">
          <span>{{msg}}</span>
        </router-link>
      </li>
    </ul>
    </div>
    <router-view :msg.sync></router-view>
  </div>

</template>

<script>
export default {
  name: 'vuestraptest',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>