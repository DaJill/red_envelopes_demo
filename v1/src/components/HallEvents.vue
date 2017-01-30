<template>
  <datepicker format="yyyy-MM-dd" :value="state.date"></datepicker>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'hallevents',
  data () {
    return {
      state: {
        date: new Date(2016, 9, 16)
      }
    }
  },
  components: {
    Datepicker
  }
}

</script>