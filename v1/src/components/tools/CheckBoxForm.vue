<template>
  <!-- <div class="checkboxform modal is-active"> -->
  <div class="checkboxform modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button class="delete" v-on:click="cancelChecked()"></button>
      </header>
      <section class="modal-card-body">
        <table class="table is-striped">
          <tr v-for="lists in showList">
            <th v-for="(list, key) in lists">
              <label class="checkbox">
              <input type="checkbox" id="checkbox" v-model="checkedItem[key]">
                {{list}}
              </label>
            </th>
          </tr>
        </table>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" v-on:click="successChecked()">確認</a>
        <a class="button" v-on:click="cancelChecked()">取消</a>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'checkboxform',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: this.data.list,
      col: this.data.col,
      title: this.data.title,
      originChecked: this.data.checked,
      checkedItem: this.getObjByVal(this.data.checked),
      showList: {}
    }
  },
  props: ['data'],
  methods: {
    setShowList: function () {
      if (!this.col) {
        this.col = 1
      }
      var aShowList = {}
      var iNowCol = 0
      var iListIndex = 0
      var rowData = {}
      for (var dataIndex in this.list) {
        rowData[dataIndex] = this.list[dataIndex]
        iNowCol++
        if (iNowCol >= this.col) {
          aShowList[iListIndex] = rowData
          rowData = {}
          iNowCol = 0
          iListIndex++
        }
      }
      this.showList = aShowList
      this.checkedItem = this.getObjByVal(this.data.checked)
    },
    cancelChecked: function () {
      this.checkedItem = this.getObjByVal(this.data.checked)
      this.$emit('listen', this.checkedItem)
    },
    successChecked: function () {
      this.$emit('listen', this.checkedItem)
    },
    getObjByVal: function (_oA) {
      var tmpB = {}
      for (var index in _oA) {
        tmpB[index] = _oA[index]
      }
      return tmpB
    }
  },
  created: function () { // document ready
    this.setShowList()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
