export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('users/init')
    await dispatch('vans/init')
    await dispatch('orgs/init')
    await dispatch('bookings/init')
  },
}
