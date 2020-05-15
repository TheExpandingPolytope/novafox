import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { accessor } from './';

export const namespaced = true

export const state = () => ({
    authModalVisibility: false,
    authModalTabIndex: 0,
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  setAuthModalVisibility(state, visibility: boolean) {
    state.authModalVisibility = visibility;
  },
  setAuthModalTabIndex(state, index: number) {
    state.authModalTabIndex = index
  },
})

export const actions = actionTree(
    { state, getters, mutations }, 
    {
        showLogin(){
            accessor.ui.setAuthModalTabIndex(0);
            accessor.ui.setAuthModalVisibility(true);
        },
        showSignUp(){
            accessor.ui.setAuthModalTabIndex(1);
            accessor.ui.setAuthModalVisibility(true);
        },
        hideAuth(){
            accessor.ui.setAuthModalVisibility(false);
        }
    }
)
