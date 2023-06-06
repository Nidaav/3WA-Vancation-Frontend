import axios from 'axios'

// STATE

export const state = () => ({
  users: [],
  connectedUser: {
    email: 'b@b',
    firstName: 'frederico',
    lastName: 'bourhis',
    password: '$2b$10$wTvedkz0WbLw8.sQX2TVleNn52T9w1r0zRSxux1v/5cFWGSs.ph5O',
    role: 2,
    signUpDate: '2023-06-03T09:07:42.000Z',
    userId: 2,
    orgId: 2,
  },
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
  // SET_IS_CONNECTED(state, res) {
  //   state.isConnected = res
  // },
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
    // console.log('resultUsers:', resultUsers)
    commit('SET_USERS', resultUsers.data)
  },

  // CREATE USER

  async createUser({ commit }, formData) {
    const body = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }
    const createUser = await axios.post('http://localhost:3001/users/', body)
    const createdUser = {
      userId: createUser.data.data.id,
      firstName: createUser.data.newUser.firstName,
      lastName: createUser.data.newUser.lastName,
      password: createUser.data.newUser.password,
      signUpDate: createUser.data.newUser.signUpDate,
      role: createUser.data.newUser.role,
    }
    commit('CREATE_USER', createdUser)
    return createUser
  },

  // LOGIN USER

  async loginUser({ commit }, loginConn) {
    // console.log('loginConn:', loginConn)
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

export const getters = {
  // getUsers: (state, getters, rootState, rootGetters) => {
  //   // c'est l'ordre IMPERATIF des params
  //   const gettersOrganisationById =
  //     rootGetters['organisations/organisationKeyById']
  //   const getUsers = []
  //   for (const user of state.users) {
  //     const stInfo = state.userTypes.find(
  //       (st) => user.userTypeId.toString() === st.id.toString()
  //     )
  //     getUsers.push({
  //       ...user,
  //       brand: stInfo ? stInfo.brand : null,
  //       model: stInfo ? stInfo.model : null,
  //       organisation: gettersOrganisationById[user.organisationId],
  //     })
  //   }
  //   return getUsers
  // },
}
