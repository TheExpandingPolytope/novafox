<template>
  <div ref="component" class="main">
      <nav-bar></nav-bar>
      <login></login>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Ref, Watch, Vue } from 'vue-property-decorator'
    
    import MainNavbar from './MainNavbar.vue';
    import MainLogin from './MainLogin.vue';
    //import MainRoomList from './MainRoomList.vue';

    @Component({
        name: 'app',
        components:{
            'nav-bar': MainNavbar,
            'login': MainLogin,
            //'room-list': MainRoomList,
        }
    })
    export default class extends Vue {

    }
</script>
