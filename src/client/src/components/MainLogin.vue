<template>
    <b-modal :active.sync="modalVisibility"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal>
        <div class="card">
        <b-tabs position="is-centered" v-model="index" class="block">

            <b-tab-item label="Login">
                <b-field label="Email">
                    <b-input type="email"
                        value=""
                        maxlength="30"
                        v-model="emailLogin">
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password"
                        password-reveal
                        v-model="passwordLogin">
                    </b-input>
                </b-field>

                <b-button v-on:click="login" type="is-primary">Login</b-button>
            </b-tab-item>

            <b-tab-item label="Signup">
                <b-field label="Email">
                    <b-input type="email"
                        value=""
                        maxlength="30"
                        v-model="emailSignUp">
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password"
                        password-reveal
                        v-model="passwordSignUp">
                    </b-input>
                </b-field>

                <b-button v-on:click="signup" type="is-primary">Sign Up</b-button>
            </b-tab-item>
        </b-tabs>
        </div>
    </b-modal>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Ref, Watch, Vue } from 'vue-property-decorator'

    @Component({
        name: 'login', 
    })
    export default class extends Vue {    
        private emailSignUp: string = '';
        private passwordSignUp: string = '';
        
        private emailLogin: string = '';
        private passwordLogin: string = '';

        get index() {
            return this.$accessor.authModalTabIndex;
        }

        set index(value: number){
            this.$accessor.ui.setAuthModalTabIndex(value);
        }

        get modalVisibility() {
            return this.$accessor.ui.authModalVisibility;
        }

        set modalVisibility(value: boolean){
            this.$accessor.ui.setAuthModalVisibility(value);
        }

        login(){
            this.$accessor.auth.login({
                email: this.emailLogin,
                password: this.passwordLogin, 
            })
        }

        signup(){
            this.$accessor.auth.login({
                email: this.emailSignUp,
                password: this.passwordSignUp, 
            })
        }
    }
</script>
