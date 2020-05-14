import Vue from 'vue'
import Vuex from 'vuex'
import { useAccessor, mutationTree, actionTree } from 'typed-vuex'

import * as room from './room';
import * as auth from './auth';

export const state = () => ({
})
  
export const mutations = mutationTree(state, {
})

export const actions = actionTree(
    { state, mutations },
    {
    }
)
  
export const storePattern = {
    state,
    mutations,
    actions,
    modules: { auth, room },
}

Vue.use(Vuex)

const store = new Vuex.Store(storePattern)
export const accessor = useAccessor(store, storePattern)

Vue.prototype.$accessor = accessor

declare module 'vue/types/vue' {
    interface Vue {
        $accessor: typeof accessor
    }
}

export default store