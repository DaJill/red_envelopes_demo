<template>
  <div class="event_red_envelope_corporate">
    <div class="message" v-if="showMessage == true">
      <div class="message-header">
      說明
      <button class="delete" @click="showMessage = false"></button>
      </div>
      <div class="message-body">
        <ul>
          <li>『緊急停止』是停止兌獎</li>
          <li><span class="tag is-dark">&nbsp;</span> 尚未開始</li>
          <li><span class="tag is-warning">&nbsp;</span> 進行中</li>
          <li><span class="tag is-success">&nbsp;</span> 活動結束</li>
          <li><span class="tag is-danger">&nbsp;</span> 緊急停止</li>
        </ul>
      </div>
    </div>
    <div class="message">
      <el-row class="message-body">
        <el-col :span="4">
          <el-select v-model="nowSearchOption" placeholder="請選擇搜尋方式" @change="changeLayout">
            <el-option v-for="searchOption in searchOptions" :label="searchOption.label" :value="searchOption.value"></el-option>
          </el-select>
        </el-col>
        <el-col v-if="nowSearchOption=='status'" :span="4">
          <el-select v-model="nowStatusOption" :placeholder="statusOptions[0].label">
            <el-option v-for="statusOption in statusOptions" :label="statusOption.label" :value="statusOption.value"></el-option>
          </el-select>
        </el-col>
        <el-col v-if="nowSearchOption=='date'" :span="5">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            placeholder="發放開始日 - 兌換結束日">
          </el-date-picker>
        </el-col>
        <el-col v-if="nowSearchOption!=''" :span="2">
          <el-button type="info" @click="selectData">查詢</el-button>
        </el-col>
        <el-col :span="2" :offset="createEventBtnOffset">
          <el-button type="info">建立活動</el-button>
        </el-col>
      </el-row>

      <el-table :data="eventDataList" style="width: 100%">
        <el-table-column label="序" min-width="80" prop="EventID"></el-table-column>
        <el-table-column label="設定" min-width="80">
          <template scope="scope">
            <el-button size="small" @click="setEvent(scope.$index)">
              <span class="icon">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="報表" min-width="80">
          <template scope="scope">
            <el-button size="small" @click="watchEventReport(scope.$index)">
              <span class="icon">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
              </span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="名稱" min-width="200" prop="EventName"></el-table-column>
        <el-table-column label="發放時間" min-width="170">
          <template scope="scope">
            <span v-if="eventDataList[scope.$index].Status === 0 " class="tag is-dark">&nbsp;</span>
            <span v-else-if="eventDataList[scope.$index].Status === 1 " class="tag is-warning">&nbsp;</span>
            <span v-else-if="eventDataList[scope.$index].Status === 2 " class="tag is-success">&nbsp;</span>
            {{eventDataList[scope.$index].EventStartDate}} - {{eventDataList[scope.$index].EventEndDate}}
          </template>
        </el-table-column>
        <el-table-column label="兌獎時間" min-width="170">
          <template scope="scope">
            <span v-if="eventDataList[scope.$index].EMS === 1" class="tag is-danger">&nbsp;</span>
            <span v-else-if="eventDataList[scope.$index].Status === 0 " class="tag is-dark">&nbsp;</span>
            <span v-else-if="eventDataList[scope.$index].Status === 1 " class="tag is-warning">&nbsp;</span>
            <span v-else-if="eventDataList[scope.$index].Status === 2 " class="tag is-success">&nbsp;</span>
            {{eventDataList[scope.$index].PayStartDate}}-{{eventDataList[scope.$index].PayEndDate}}
          </template>
        </el-table-column>
        <el-table-column label="緊急停止" min-width="50">
          <template scope="scope">
            <el-button v-if="eventDataList[scope.$index].EMS === 0" size="small" @click="watchEventReport(scope.$index)">
              <span class="icon">
                <i class="fa fa-ban" aria-hidden="true"></i>
              </span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
export default {
  name: 'event_red_envelope_corporate',
  data () {
    return {
      createEventBtnOffset: 18,
      nowSearchOption: '',
      searchOptions: [ // 搜尋方式的下拉選單
        {
          value: 'status',
          label: '狀態搜尋'
        },
        {
          value: 'date',
          label: '日期搜尋'
        }
      ],
      nowStatusOption: -1,
      statusOptions: [ // 狀態搜尋的下拉選單
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '進行中'
        },
        {
          value: 0,
          label: '尚未開始'
        },
        {
          value: 2,
          label: '活動結束'
        }
      ],
      dateRange: '',
      eventDataList: [],
      showMessage: true
    }
  },
  methods: {
    changeLayout: function () {
      if (this.nowSearchOption === 'status') {
        this.createEventBtnOffset = 12
      } else if (this.nowSearchOption === 'date') {
        this.createEventBtnOffset = 11
      }
    },
    selectData: function () {
      if (this.nowSearchOption === 'status') {
        this.$http.get('http://localhost:8088/api/event/list/' + this.nowStatusOption).then(
        function (response) {
          var aResponse = response.body
          if (aResponse.event === true) {
            this.eventDataList = Object.keys(aResponse.data).map(function (key) {
              return aResponse.data[key]
            })
          }
        })
      } else if (this.nowSearchOption === 'date') {
        var startDate = Moment(this.dateRange[0]).format('YYYY-MM-DD')
        var endDate = Moment(this.dateRange[1]).format('YYYY-MM-DD')
        console.log('http://localhost:8088/api/event/list/date?start=' + startDate + '&end=' + endDate)
        this.$http.get('http://localhost:8088/api/event/list/date?start=' + startDate + '&end=' + endDate).then(
        function (response) {
          var aResponse = response.body
          if (aResponse.event === true) {
            this.eventDataList = Object.keys(aResponse.data).map(function (key) {
              return aResponse.data[key]
            })
          }
        })
      }
    },
    setEvent: function (_iID) {
      console.log(_iID)
    },
    watchEventReport: function (_iID) {
      console.log(_iID)
    },
    closeMessage: function () {
      this.showMessage = false
    }
  },
  created: function () { // 建制完以後就會執行以下
    this.$emit('change-name', this.$route.name)
  }
}
</script>