<template>
  <div class="tools">
    <component v-on:listen='sendParents' :is="component" :data="data" :listen="'listen'"/>
  </div>
</template>
<script>
import CheckBoxForm from './tools/CheckBoxForm'
export default {
  name: 'tools',
  components: {
    CheckBoxForm
  },
  props: ['component', 'data', 'listen'],
  methods: {
    sendParents: function (_aChildData) {
      this.$emit(this.listen, _aChildData)
    }
  }
}
</script>
