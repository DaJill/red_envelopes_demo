<template>
  <div>
    <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
    <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
    <datepicker format="yyyy-MM-dd" :value="state.date"></datepicker>
    <!-- {{msg}} -->
    <a href="/corporateevents">777</a>
    <Tools @checkcheck="getDataHaHa" v-if="show === true" :component="'CheckBoxForm'" :listen="'checkcheck'" :data="CheckBoxFormData"></Tools>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Tools from './Tools'
export default {
  name: 'hallevents',
  data () {
    return {
      radio: '1',
      state: {
        date: new Date(2016, 9, 16)
      },
      CheckBoxFormData: {
        list: {
          1: '博九 @b1',
          2: '博九 @b2',
          3: '博九 @b3',
          4: '博九 @b4',
          5: '博九 @b5',
          6: 'Esball @esb',
          7: '博九 @b6',
          8: '博九 @b7',
          9: '博九 @b8',
          10: '博九 @9',
          11: '博九 @b10',
          12: '博九 @b11',
          13: '博九 @b12',
          14: '博九 @b13'
        },
        checked: {
          1: true,
          2: true,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false
        },
        col: 3,
        title: '自選 直營網'
      },
      show: true
    }
  },
  components: {
    Datepicker,
    Tools
  },
  // props: ['msg'],
  created: function () { // document ready
    this.$emit('sendPath', this.$route.path)
    console.log(this.$route.query.stats)
  },
  methods: {
    getDataHaHa: function (_aData) {
      console.log('I am Main!!', _aData)
    }
  }
}

</script>