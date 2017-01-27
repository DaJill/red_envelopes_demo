<template>
  <div id="app">
    <VuestrapTest></VuestrapTest>
  </div>
</template>

<script>
// import Hello from './components/Hello'
// import VuestrapTest from './components/VuestrapTest'
import CUSTOM_STYLE from './assets/custom.sass'
import ICON_STYLE from './assets/font-awesome-4.7.0/css/font-awesome.min.css'
// import Bulma from 'bulma'
// require("style/url!file!./file.css")
export default {
  name: 'app',
  components: {
    CUSTOM_STYLE,
    ICON_STYLE
  }
}
</script>
