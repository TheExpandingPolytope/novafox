<template>
  <div ref="component" class="main">
    hello
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Ref, Watch, Vue } from 'vue-property-decorator'
    
    import Login from '~/Login.vue';
    import Signup from '~/Signup.vue';
    import MainRoom from '~/MainRoomList.vue';

    @Component({
        name: 'app',
        components:{
            'login':
        }
    })
    export default class extends Vue {

    }
</script>
