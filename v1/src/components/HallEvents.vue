<template>
  <div>
    <datepicker format="yyyy-MM-dd" :value="state.date"></datepicker>
    <!-- {{msg}} -->
    <a href="/corporateevents">777</a>
  </div>
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
  },
  // props: ['msg'],
  created: function () { // document ready
    this.$emit('sendPath', this.$route.path)
    console.log(this.$route.query.stats)
  }
}

</script>