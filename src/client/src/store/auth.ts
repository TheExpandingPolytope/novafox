import { mutationTree, actionTree } from 'typed-vuex'
import { accessor } from './';

interface User {
  id: string
  email: string
  username: string,
  img: string,
}

export const namespaced = true;

export const state = () => ({
    isAuth: {} as Boolean,
    user: {} as User,
})

export const getters = mutationTree(state, {});

export const mutations = mutationTree(state, {
    setAuth(state, val: Boolean) {
        state.isAuth = val;
    },
    setUser(state, user: User) {
        state.user = user;
    },
})

export const actions = actionTree(
    {state, getters, mutations},
    {
        login({ state }, { email, password}: {email: string, password: string}){
            $http
                .post<User>('http://localhost:5000/api/auth/register_login',{
                    email,
                    password,
                })
                .then((req) => {
                    accessor.auth.setAuth(true);
                    accessor.auth.setUser(req.data);
                })
                .catch(console.error)
        },
        logout(){
            $http
                .post<User>('http://localhost:5000/api/auth/logout')
                .then((req) => {
                    accessor.auth.setAuth(false);
                    accessor.auth.setUser({username:'', id:'', img:'', email:''});
                })
                .catch(console.error)
        }
    }
)
