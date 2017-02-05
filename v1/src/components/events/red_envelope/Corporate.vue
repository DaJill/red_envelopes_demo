<template>
  <div class="event_red_envelope_corporate">
  hahahaha
  </div>
</template>

<script>
export default {
  name: 'event_red_envelope_corporate',
  data () {
    return {
      pName: this.name
    }
  },
  // props: ['name'],
  created: function () { // 建制完以後就會執行以下
    this.$emit('change-name', this.$route.name)
  }
}
</script>

