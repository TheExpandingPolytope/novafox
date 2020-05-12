<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  
</style>

<script lang="ts">
  import { Vue, Component, Ref } from 'vue-property-decorator'

  @Component({
    name: 'app',
  })
  export default class extends Vue { 
    
  }
</script>
