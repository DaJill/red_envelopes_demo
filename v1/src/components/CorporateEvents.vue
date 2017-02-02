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
    <table class="table is-striped">
      <thead>
        <tr>
          <th><abbr title="活動序號">序</abbr></th>
          <th>設定</th>
          <th>報表</th>
          <th>名稱</th>
          <th>發放時間</th>
          <th>兌獎時間</th>
          <th>緊急停止</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="活動序號">序</abbr></th>
          <th>設定</th>
          <th>報表</th>
          <th>名稱</th>
          <th>發放時間</th>
          <th>兌獎時間</th>
          <th>緊急停止</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="EventData in EventList">
          <th><abbr title="活動序號">{{ EventData.EventID }}</abbr></th>
          <th>
            <abbr title="設定">
              <a class="button">
                <span class="icon">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </span>
              </a>
            </abbr>
          </th>
          <th>
            <abbr title="報表">
              <a class="button">
                <span class="icon is-small">
                  <i class="fa fa-bar-chart" aria-hidden="true"></i>
                </span>
              </a>
            </abbr>
          </th>
          <th><abbr title="名稱">{{ EventData.EventName }}</abbr></th>
          <th>
            <abbr title="發放時間">
              <span v-if="EventData.Status === 0 " class="tag is-dark">&nbsp;</span>
              <span v-else-if="EventData.Status === 1 " class="tag is-warning">&nbsp;</span>
              <span v-else-if="EventData.Status === 2 " class="tag is-success">&nbsp;</span>
              {{ EventData.EventStartDate }}~{{ EventData.EventEndDate }}
            </abbr>
          </th>
          <th>
            <abbr title="兌獎時間">
              <span v-if="EventData.EMS === 1" class="tag is-danger">&nbsp;</span>
              <span v-else-if="EventData.Status === 0 " class="tag is-dark">&nbsp;</span>
              <span v-else-if="EventData.Status === 1 " class="tag is-warning">&nbsp;</span>
              <span v-else-if="EventData.Status === 2 " class="tag is-success">&nbsp;</span>
              {{ EventData.PayStartDate }}~{{ EventData.PayEndDate }}
            </abbr>
          </th>
          <th>
            <abbr title="緊急停止">
              <a v-if="EventData.EMS === 0" class="button">
                <span class="icon">
                  <i class="fa fa-ban" aria-hidden="true"></i>
                </span>
              </a>
            </abbr>
          </th>
        </tr>
      </tbody>
    </table>
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
      if (this.searchTypeData.selected === 'status') {
        window.location.href = this.$route.path + '?status=' + this.searchStatusTypeData.selected
        return
      }

      if (this.searchTypeData.selected === 'date') {
        var startDate = Moment(this.pickDate.start).format('YYYY-MM-DD')
        var endDate = Moment(this.pickDate.end).format('YYYY-MM-DD')
        window.location.href = this.$route.path + '?start=' + startDate + '&end=' + endDate
      }
    },
    showHttpData: function (_sUrl) {
      this.$http.get(_sUrl).then(function (response) {
        var aResponse = response.body
        if (aResponse.event === true) {
          this.EventList = aResponse.data
        }
      })
    }
  },
  created: function () { // 建制完以後就會執行以下
    this.$emit('sendPath', this.$route.path) // 傳自身路徑給父親，這樣tab才會變動
    var sUrl = ''
    if (this.$route.query.status) {
      sUrl = 'http://localhost:8088/api/event/list/' + this.$route.query.status
      this.showHttpData(sUrl)
    } else if (this.$route.query.start && this.$route.query.end) {
      var startDate = this.$route.query.start
      var endDate = this.$route.query.end
      sUrl = 'http://localhost:8088/api/event/list/date?start=' + startDate + '&end=' + endDate
      this.showHttpData(sUrl)
    }
  }
}
</script>