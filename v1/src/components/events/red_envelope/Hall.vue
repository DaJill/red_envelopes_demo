<template>
  <div class="event_red_envelope_hall">
  hallhallhallhallhall
  </div>
</template>

<script>
export default {
  name: 'event_red_envelope_hall',
  data () {
    return {
    }
  },
  created: function () { // 建制完以後就會執行以下
    this.$emit('change-name', this.$route.name)
  }
}
</script>

