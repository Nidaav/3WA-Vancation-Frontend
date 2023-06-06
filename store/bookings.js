import axios from 'axios'

// STATE

export const state = () => ({
  bookings: [],
  bookingReviews: [],
})

// MUTATIONS

export const mutations = {
  SET_BOOKINGS(state, res) {
    state.bookings = res
  },
  SET_BOOKING_REVIEWS(state, res) {
    state.bookingReviews = res
  },
  CREATE_BOOKING(state, res) {
    state.bookings.push(res)
  },
  UPDATE_BOOKING(state, res) {
    const index = state.bookings.findIndex((i) => i.bookingId === res.bookingId)
    state.bookings.splice(index, 1, res)
  },
  DELETE_BOOKING(state, bookingId) {
    const index = state.bookings.findIndex((i) => i.bookingId === bookingId)
    state.bookings.splice(index, 1)
  },
}

// ACTIONS

export const actions = {
  async init({ dispatch, commit, getters, state, rootGetters, rootState }) {
    await dispatch('getBookings')
    await dispatch('getBookingReviews')
  },

  async getBookings({ commit }) {
    const res = await axios.get('http://localhost:3001/bookings')
    commit('SET_BOOKINGS', res.data)
  },

  async getBookingReviews({ commit }) {
    const res = await axios.get('http://localhost:3001/bookings/reviews')
    commit('SET_BOOKING_REVIEWS', res.data)
  },
  // CREATE VAN

  async createBooking({ commit }, bookingData) {
    let start = null
    let end = null
    if (
      new Date(bookingData.dates[0]).getTime() <
      new Date(bookingData.dates[1]).getTime()
    ) {
      start = new Date(bookingData.dates[0])
      end = new Date(bookingData.dates[1])
    } else {
      end = new Date(bookingData.dates[0])
      start = new Date(bookingData.dates[1])
    }
    const diff = end.getTime() - start.getTime()
    const days = Math.ceil(diff / (1000 * 3600 * 24))
    const body = {
      userId: bookingData.user.userId,
      vanId: bookingData.van.vanId,
      orgId: bookingData.van.orgId,
      startDate: start,
      endDate: end,
      priceTotal: bookingData.van.price * days,
      status: 'en attente',
    }
    const createBooking = await axios.post(
      'http://localhost:3001/bookings/',
      body
    )
    commit('CREATE_BOOKING', createBooking.data.data)
    return body
  },

  async createReview({ commit }, review) {

    const createReview = await axios.post(
      'http://localhost:3001/bookings/reviews',
      review
      )
      console.log('createReview:', createReview)
    // commit('CREATE_REVIEW', createReview.data.data)
    return review
  },

  // UPDATE VAN

  async updateBooking({ commit }, { date, booking }) {
    let start = null
    let end = null
    if (new Date(date[0]).getTime() < new Date(date[1]).getTime()) {
      start = new Date(date[0])
      end = new Date(date[1])
    } else {
      end = new Date(date[0])
      start = new Date(date[1])
    }
    const diff = end.getTime() - start.getTime()
    const days = Math.ceil(diff / (1000 * 3600 * 24))
    const body = {
      bookingId: booking.bookingId,
      userId: booking.userId,
      vanId:booking.vanId,
      orgId:booking.orgId,
      startDate: start,
      endDate: end,
      priceTotal: booking.van.price * days,
      status: 'en attente',
    }
    const updatedBooking = await axios.patch(
      `http://localhost:3001/bookings/${booking.bookingId}`,
      body
      )
    commit('UPDATE_BOOKING', updatedBooking.data.data)
    return updatedBooking.data.data
  },

  async acceptBookingStatus({ commit }, booking){
    const body = {
      bookingId: booking.bookingId,
      userId: booking.userId,
      vanId:booking.vanId,
      orgId:booking.orgId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      priceTotal: booking.priceTotal,
      status: 'acceptée',
    }
    const updatedBooking = await axios.patch(
      `http://localhost:3001/bookings/${booking.bookingId}`,
      body
      )
      commit('UPDATE_BOOKING', updatedBooking.data.data)
      return updatedBooking.data.data
  },
  async refuseBookingStatus({ commit }, booking){
    const body = {
      bookingId: booking.bookingId,
      userId: booking.userId,
      vanId:booking.vanId,
      orgId:booking.orgId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      priceTotal: booking.priceTotal,
      status: 'refusée',
    }
    const updatedBooking = await axios.patch(
      `http://localhost:3001/bookings/${booking.bookingId}`,
      body
      )
      commit('UPDATE_BOOKING', updatedBooking.data.data)
      return updatedBooking.data.data
  },

  // DELETE VAN

  async deleteBooking({ commit }, id) {
    await axios.delete(`http://localhost:3001/bookings/${id}`)
    commit('DELETE_BOOKING', id)
  },
}

// GETTERS

export const getters = {
  getReviewsAndStarsByVan: (state, getters, rootState, rootGetters) => {
    const reviewsByVan = []
    const allVans = rootState.vans.vans
    for (const van of allVans) {
      const reviewsForThisVan = state.bookingReviews.filter(r => r.vanId === van.vanId)
      const reviewsNumber = reviewsForThisVan.length
      let starValue = 0
      const allComments = []
      for (const review of reviewsForThisVan) {
        starValue += review.rating
        if (review.comment) {
          allComments.push(review.comment)
        }
      }
      const starNote = Math.round((starValue / reviewsNumber) * 10) / 10
      reviewsByVan.push({vanId: van.vanId, reviews: allComments, stars: starNote, reviewsNumber})
    }
    return reviewsByVan
  }
}

// getVansWithPictures: (state, getters, rootState, rootGetters) => {
//   const getVansWithPic = []
//   for (const van of state.vans) {
//     const readablePic = []
//     const vanPictures = state.vansPictures.filter((vp) => van.vanId === vp.vanId)
//     for (const picture of vanPictures) {
//       const uint8Array = new Uint8Array(picture.picture.data);
//       const blob = new Blob([uint8Array], { type: 'image/jpeg' });
//       const readableImage = URL.createObjectURL(blob);
//       readablePic.push(readableImage)
//     }
//     getVansWithPic.push({...van, readablePictures : readablePic})
//   }
//   return getVansWithPic
// }