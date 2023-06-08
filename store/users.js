import axios from 'axios'

// STATE

export const state = () => ({
  users: [],
  connectedUser: null,
})

// MUTATIONS

export const mutations = {
  SET_USERS(state, res) {
    state.users = res
  },
  CREATE_USER(state, res) {
    state.users.push(res)
  },
  UPDATE_USER(state, res) {
    const index = state.users.findIndex((i) => i.userId === res.userId)
    state.users.splice(index, 1, res)
  },
  DELETE_USER(state, id) {
    const index = state.users.findIndex((i) => i.id === id)
    state.users.splice(index, 1)
  },
  SET_CONNECTED_USER(state, res) {
    state.connectedUser = res
  },
  LOGOUT_CONNECTED_USER(state) {
    state.connectedUser = null
  }
}

// ACTIONS

export const actions = {
  async init({ dispatch, commit, getters, state, rootGetters, rootState }) {
    await dispatch('getUsers')
  },

  async getUsers({ commit }) {
    const resultUsers = await axios.get('http://localhost:3001/users/')
    commit('SET_USERS', resultUsers.data)
  },

  // CREATE USER

   async createUser({ commit }, formData) {
    let role = 1
    if (formData.role) {
      role = formData.role
    }
    const body = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role,
    }
    const createUser = await axios.post('http://localhost:3001/users/', body)
    const createdUser = {
      userId: createUser.data.newUser.userId,
      firstName: createUser.data.newUser.firstName,
      lastName: createUser.data.newUser.lastName,
      password: createUser.data.newUser.password,
      signUpDate: createUser.data.newUser.signUpDate,
      email: createUser.data.newUser.email,
      role: createUser.data.newUser.role,
    }
    commit('CREATE_USER', createdUser)
    return createdUser
  },

  // LOGIN USER

  async loginUser({ commit }, loginConn) {
    const loginAttempt = await axios.post(
      'http://localhost:3001/users/login',
      loginConn
    )
    if (loginAttempt.status === 200) {
      commit('SET_CONNECTED_USER', loginAttempt.data.user)
    }
    return loginAttempt
  },

  logoutUser({commit}) {
      commit('LOGOUT_CONNECTED_USER')
    return this.state.connectedUser
  },

  // UPDATE USER

  async updateUser({ commit }, formData) {
    const body = {
      userId: formData.userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    }
    const res = await axios.patch(
      `http://localhost:3001/users/${formData.id}`,
      body
      )
    const updatedUser = {
      userId: formData.userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      signUpDate : formData.signUpDate
    }
    commit('UPDATE_USER', updatedUser)
    return res
  },

  // DELETE USER

  async deleteUser({ commit }, id) {
    await axios.delete(`http://localhost:3001/users/${id}`)
    commit('DELETE_USER', id)
  },
}

// GETTERS

export const getters = {}
