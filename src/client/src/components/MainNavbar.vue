<template>
      <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <h1><b>novafox</b></h1>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                Home
            </b-navbar-item>
            <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item  v-if="isAuth" tag="div">
                <div class="buttons">
                    <a v:on:click="showSignUp" @click="showSignUp" class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a v:on:click="showLogin" @click="showLogin" class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
            <b-navbar-item v-else>
                <p>{{ user.username }}</p>
                <a v:on:click="showLogin" @click="logout" class="button is-light">
                  Log out
                </a>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Ref, Watch, Vue } from 'vue-property-decorator'

    @Component({
        name: 'navbar',
    })
    export default class extends Vue {
        get user(){
          return this.$accessor.auth.user;
        }

        set user(value: any){
          this.$accessor.auth.setUser(value);
        }

        get isAuth(){
          return this.$accessor.auth.isAuth;
        }

        set isAuth(value: Boolean){
          this.$accessor.auth.setAuth(value);
        }

        showLogin(){
            this.$accessor.ui.showLogin();
            console.log(this.$accessor.ui);

        }

        showSignUp(){
            this.$accessor.ui.showSignUp();
            console.log(this.$accessor.ui)

        }

        logout(){
          this.$accessor.auth.logout();
        }
    }
</script>
