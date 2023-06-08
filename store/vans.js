import axios from 'axios'
import Blob from 'blob';

// STATE

export const state = () => ({
  vans: [],
  vansPictures: [],
})

// MUTATIONS

export const mutations = {
  SET_VANS(state, res) {
    state.vans = res
  },
  SET_VANS_PICTURES(state, res) {
    state.vansPictures = res
  },
  CREATE_VAN(state, res) {
    state.vans.push(res)
  },
  UPDATE_VAN(state, res) {
    const index = state.vans.findIndex((i) => i.vanId === res.vanId)
    state.vans.splice(index, 1, res)
  },
  DELETE_VAN(state, id) {
    const index = state.vans.findIndex((i) => i.id === id)
    state.vans.splice(index, 1)
  },
}

// ACTIONS

export const actions = {
  async init({ dispatch, commit, getters, state, rootGetters, rootState }) {
    await dispatch('getVans')
    await dispatch('getVansPictures')
  },

  async getVans({ commit }) {
    const res = await axios.get('http://localhost:3001/vans/')
    commit('SET_VANS', res.data)
  },

  async getVansPictures({ commit }) {
    const res = await axios.get('http://localhost:3001/vans/pictures')
    commit('SET_VANS_PICTURES', res.data)
  },

  // CREATE VAN

  async createVan({ commit }, formData) {
    const body = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }
    const createVan = await axios.post('http://localhost:3001/vans/', body)
    const createdVan = {
      id: createVan.data.id,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    }
    commit('CREATE_VAN', createdVan)
    return createVan
  },

  // UPDATE VAN

  async updateVan({ commit }, formData) {
    const body = {
      vanId: formData.vanId,
      model: formData.model,
      capacity: formData.capacity,
      description: formData.description,
      price: formData.price,
    }
    const res = await axios.patch(
      `http://localhost:3001/vans/${formData.vanId}`,
      body
      )
    const updatedVan = {
      vanId: formData.vanId,
      orgId: formData.orgId,
      model: formData.model,
      capacity: formData.capacity,
      description: formData.description,
      price: formData.price,
    }
    commit('UPDATE_VAN', updatedVan)
    return res
  },

  // DELETE VAN

  async deleteVan({ commit }, id) {
    await axios.delete(`http://localhost:3001/vans/${id}`)
    commit('DELETE_VAN', id)
  },
}

// GETTERS

export const getters = {
  getVansWithPictures: (state) => {
    const getVansWithPic = []
    for (const van of state.vans) {
      const readablePic = []
      const vanPictures = state.vansPictures.filter((vp) => van.vanId === vp.vanId)
      for (const picture of vanPictures) {
        const uint8Array = new Uint8Array(picture.picture.data);
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        const readableImage = URL.createObjectURL(blob);
        readablePic.push(readableImage)
      }
      getVansWithPic.push({...van, readablePictures : readablePic})
    }
    return getVansWithPic
  }
}
