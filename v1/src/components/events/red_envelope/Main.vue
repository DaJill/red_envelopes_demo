<template>
  <div class="event_red_envelope_main">
    <el-tabs v-model="nowTab" @tab-click="TabClick" type="card">
      <el-tab-pane label="公司活動" name="corporate"/>
      <el-tab-pane label="廳主活動" name="hall"/>
    </el-tabs>
    <router-view @change-name="changeTab"></router-view>
  </div>
</template>

<script>
export default {
  name: 'event_red_envelope_main',
  data () {
    return {
      nowTab: ''
    }
  },
  methods: {
    TabClick (_tab, _event) {
      this.$router.push(
        {
          name: _tab.name // 利用name來找到路徑
        }
      )
    },
    changeTab (_name) {
      this.nowTab = _name
    }
  }
}
</script>

