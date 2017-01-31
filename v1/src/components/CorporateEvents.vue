<template>
  <!-- <div class="tile is-parent"> -->
  <div>
    <article class="message is-primary">
      <nav class="tile level message-body ">
        <div class="level-left">
          請選擇：
          <span class="select">
            <select v-model="searchTypeData.selected">
              <option v-for="option in searchTypeData.options" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </span>
          
          <span v-if="searchTypeData.selected === 'status'">
          、狀態：  
          </span>
          
          <span v-if="searchTypeData.selected === 'status'" class="select">
            <select v-model="searchStatusTypeData.selected">
              <option v-for="option in searchStatusTypeData.options" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </span>

          <span v-if="searchTypeData.selected === 'date'">
          、日期：發放開始日：
          </span>
          <span v-if="searchTypeData.selected === 'date'">
            <datepicker v-model="pickDate.start" :format="format" :value="state.dateStart"></datepicker>
          </span>      
          
          <span v-if="searchTypeData.selected === 'date'">
          兌獎結束日：
          </span>
          <span v-if="searchTypeData.selected === 'date'">
            <datepicker v-model="pickDate.end" :format="format" :value="state.endStart"></datepicker>
          </span>
          <button v-on:click="searchData()" class="button is-primary">查詢</button>
        </div>

        <div class="level-right">
          <button class="button is-info">建立活動</button>
        </div>
      </nav>
    </article>

    
    1234
  </div>
</template>

<script>
var state = {
  dateStart: new Date(),
  endStart: new Date()
}
import Datepicker from 'vuejs-datepicker'
import Moment from 'moment'
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
      state: state,

      searchTypeData: {
        // 預設status
        selected: 'status',

        // select 的 options
        options: [
          {text: '狀態搜尋', value: 'status'},
          {text: '日期搜尋', value: 'date'}
        ]
      },
      searchStatusTypeData: {
        // 預設all
        selected: -1,

        // select 的 options
        options: [
          {text: '全部', value: -1},
          {text: '進行中', value: 1},
          {text: '尚未開始', value: 0},
          {text: '活動結束', value: 2}
        ]
      },
      pickDate: {
        start: state.dateStart,
        end: state.endStart
      },
      EventList: {}
    }
  },
  methods: {
    searchData: function () {
      // var aParam = {}
      var sUrl = ''
      if (this.searchTypeData.selected === 'status') {
        var status = this.searchStatusTypeData.selected
        sUrl = 'http://localhost:8088/api/event/list/' + status
      } else if (this.searchTypeData.selected === 'date') {
        var startDate = Moment(this.pickDate.start).format('YYYY-MM-DD')
        var endDate = Moment(this.pickDate.end).format('YYYY-MM-DD')
        sUrl = 'http://localhost:8088/api/event/list/date?start=' + startDate + '&end=' + endDate
      }
      // console.log()
      this.$http.get(sUrl).then(function (response) {
        var aResponse = response.body
        if (aResponse.event === true) {
          this.EventList = aResponse.data
        }
      })
    }
  }
}

</script>