import axios from 'axios'

// STATE

export const state = () => ({
  orgs: [],
})

// MUTATIONS

export const mutations = {
  SET_ORGS(state, res) {
    state.orgs = res
  },
}

// ACTIONS

export const actions = {
  async init({ dispatch, commit, getters, state, rootGetters, rootState }) {
    await dispatch('getOrgs')
  },

  async getOrgs({ commit }) {
    const resultOrgs = await axios.get('http://localhost:3001/orgs/')
    commit('SET_ORGS', resultOrgs.data)
  },
}

// GETTERS

export const getters = {}
