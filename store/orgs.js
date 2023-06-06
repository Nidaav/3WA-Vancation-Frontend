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
//   CREATE_ORG(state, res) {
//     state.orgs.push(res)
//   },
//   UPDATE_ORG(state, res) {
//     const index = state.orgs.findIndex((i) => i.id === res.id)
//     state.orgs.splice(index, 1, res)
//   },
//   DELETE_ORG(state, id) {
//     const index = state.orgs.findIndex((i) => i.id === id)
//     state.orgs.splice(index, 1)
//   },
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
  // CREATE VAN

//   async createVan({ commit }, formData) {
//     const body = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//     }
//     const createVan = await axios.post(
//       'http://localhost:3001/orgs/',
//       body
//     )
//     const createdVan = {
//       id: createVan.data.id,
//       firstName: body.firstName,
//       lastName: body.lastName,
//       password: body.password,
//     }
//     commit('CREATE_VAN', createdVan)
//     return createVan
//   },

  // UPDATE VAN

//   async updateVan({ commit }, formData) {
//     const body = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//     }
//     const res = await axios.put(
//       `http://localhost:3001/orgs/${formData.id}`,
//       body
//     )
//     const updatedVan = {
//       id: formData.id,
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//     }
//     commit('UPDATE_VAN', updatedVan)
//     return res
//   },

  // DELETE VAN

//   async deleteVan({ commit }, id) {
//     await axios.delete(`http://localhost:3001/orgs/${id}`)
//     commit('DELETE_VAN', id)
//   },
}

// GETTERS

export const getters = {
  // getVans: (state, getters, rootState, rootGetters) => {
  //   // c'est l'ordre IMPERATIF des params
  //   const gettersOrganisationById =
  //     rootGetters['organisations/organisationKeyById']

  //   const getVans = []
  //   for (const van of state.orgs) {
  //     const stInfo = state.vanTypes.find(
  //       (st) => van.vanTypeId.toString() === st.id.toString()
  //     )
  //     getVans.push({
  //       ...van,
  //       brand: stInfo ? stInfo.brand : null,
  //       model: stInfo ? stInfo.model : null,
  //       organisation: gettersOrganisationById[van.organisationId],
  //     })
  //   }
  //   return getVans
  // },
}
