<template>
      <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
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
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a v:on:click="showSignUp" @click="showSignUp" class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a v:on:click="showLogin" @click="showLogin" class="button is-light">
                        Log in
                    </a>
                </div>
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
        showLogin(){
            this.$accessor.ui.showLogin();
            console.log(this.$accessor.ui);

        }

        showSignUp(){
            this.$accessor.ui.showSignUp();
            console.log(this.$accessor.ui)

        }
    }
</script>
