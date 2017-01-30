<template>
  <div class="tile is-parent">
    <article class="tile level message is-primary">
      <div class="tile message-body">
        <nav class="level">
          <label class="radio">
            <input type="radio" name="search_type">
            狀態：
          </label>
          <span class="select">
            <select>
              <option>全部</option>
              <option>進行中</option>
              <option>尚未開始</option>
              <option>活動結束</option>
            </select>
          </span>
            ｜
          <label class="radio">
            <input type="radio" name="search_type">
            日期：
          </label>
            發放開始日：
            <datepicker :format="format" :value="state.date"></datepicker>
             ＞ 
            發放開始日：
            <datepicker :format="format" :value="state.date"></datepicker>
          </nav>
      </div>
    </article>
  </div>
</template>

<script>
var state = {
  date: new Date()
}
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'corporateevents',
  // props: ['msg'],
  components: {
    Datepicker
  },
  data () {
    return {
      format: 'yyyy-MM-dd',
      disabled: {},
      eventMsg: null,
      state: state
    }
  }
}

</script>