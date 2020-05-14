import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { Member } from '~/neko/types'
import { EVENT } from '~/neko/events'
import { accessor } from '~/store/index'

export const namespaced = true

export const state = () => ({
  id: '',
  clipboard: '',
  locked: false,
})

export const getters = getterTree(state, {
  hosting: (state, getters, root) => {
    return root.user.id === state.id
  },
  hosted: (state, getters, root) => {
    return state.id !== ''
  },
  host: (state, getters, root) => {
    return root.user.member[state.id] || null
  },
})

export const mutations = mutationTree(state, {
  setHost(state, host: string | Member) {
    if (typeof host === 'string') {
      state.id = host
    } else {
      state.id = host.id
    }
  },

  setClipboard(state, clipboard: string) {
    state.clipboard = clipboard
  },

  setLocked(state, locked: boolean) {
    state.locked = locked
  },

  reset(state) {
    state.id = ''
    state.clipboard = ''
    state.locked = false
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    sendClipboard({ getters }, clipboard: string) {
      if (!accessor.room.connected || !getters.hosting) {
        return
      }

      $client.sendMessage(EVENT.CONTROL.CLIPBOARD, { text: clipboard })
    },

    toggle({ getters }) {
      if (!accessor.room.connected) {
        return
      }

      if (!getters.hosting) {
        $client.sendMessage(EVENT.CONTROL.REQUEST)
      } else {
        $client.sendMessage(EVENT.CONTROL.RELEASE)
      }
    },

    request({ getters }) {
      if (!accessor.room.connected || !getters.hosting) {
        return
      }

      $client.sendMessage(EVENT.CONTROL.REQUEST)
    },

    release({ getters }) {
      if (!accessor.room.connected || getters.hosting) {
        return
      }

      $client.sendMessage(EVENT.CONTROL.RELEASE)
    },

    give({ getters }, member: string | Member) {
      if (!accessor.room.connected || !getters.hosting) {
        return
      }

      if (typeof member === 'string') {
        member = accessor.room.user.members[member]
      }

      if (!member) {
        return
      }

      $client.sendMessage(EVENT.CONTROL.GIVE, { id: member.id })
    },

    adminControl() {
      if (!accessor.room.connected || !accessor.room.user.admin) {
        return
      }

      $client.sendMessage(EVENT.ADMIN.CONTROL)
    },

    adminRelease() {
      if (!accessor.room.connected || !accessor.room.user.admin) {
        return
      }

      $client.sendMessage(EVENT.ADMIN.RELEASE)
    },

    adminGive({ getters }, member: string | Member) {
      if (!accessor.room.connected) {
        return
      }

      if (typeof member === 'string') {
        member = accessor.room.user.members[member]
      }

      if (!member) {
        return
      }

      $client.sendMessage(EVENT.ADMIN.GIVE, { id: member.id })
    },
  },
)
