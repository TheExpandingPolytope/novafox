<template>
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

            <b-button type="is-primary">Login</b-button>
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

            <b-button type="is-primary">Sign Up</b-button>
        </b-tab-item>
    </b-tabs>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Ref, Watch, Vue } from 'vue-property-decorator'

    @Component({
        name: 'login',
    })
    export default class extends Vue {
        @Prop({default: 0}) index: Number;
    
        private emailSignUp: string = '';
        private passwordSignUp: string = '';
        
        private emailLogin: string = '';
        private emailLogin: string = '';

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
