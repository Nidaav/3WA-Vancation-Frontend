<template>
  <v-container>
    <v-row>
      <h1>Mes réservations</h1>
    </v-row>
    <v-row v-if="allBookings.length === 0">
    <h2>Vous n'avez pas encore effectué de réservation</h2>
    <v-btn to="/vans">Découvrez les vans disponibles</v-btn>
    </v-row>
    <v-row v-if="allBookings.length > 0">
      <v-col v-for="(booking, index) in allBookings" :key="index" cols="12" md="6" sm="12">
        <v-card>
          <v-card-title>{{ booking.van.model }}</v-card-title>
          <v-carousel>
            <v-carousel-item v-for="(picture, i) in booking.van.readablePictures" :key="i" :src="picture">
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <div class="my-4 text-subtitle-1">
              {{ booking.priceTotal }} € • {{ booking.van.capacity }} places
            </div>
            <v-row>
              <v-col>
                Du {{ format(new Date(booking.startDate), 'dd/MM/yyyy') }} au {{ format(new Date(booking.endDate),
                  'dd/MM/yyyy') }}
              </v-col>
              <v-spacer></v-spacer>
              <v-col v-if="booking.status === 'en attente' && new Date(booking.startDate).getTime() < new Date().getTime()"><h4> refusée </h4></v-col>
              <v-col v-else><h4>{{ booking.status }}</h4></v-col>
            </v-row>
            <v-row>
              <v-col v-if="booking.status === 'en attente' && new Date(booking.startDate).getTime() > new Date().getTime()" class="d-flex justify-space-between">
                <v-btn :to="'/vans/' + booking.van.vanId">Voir ce van</v-btn>
                <v-btn color="warning" @click="showBookingDialog({ value: true, booking })">Modifier</v-btn>
              </v-col>
              <v-col v-if="booking.status === 'acceptée' && new Date(booking.endDate).getTime() < new Date().getTime()" class="d-flex justify-center">
                <v-btn color="info" @click="makeReview(booking)">Laisser un commentaire</v-btn>
              </v-col>
              <v-col v-if="new Date(booking.startDate).getTime() < new Date().getTime()" class="d-flex justify-center">
                <v-btn :to="'/vans/' + booking.van.vanId">Revoir ce van</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showBooking" content-class="custom-dialog" width="290">
      <v-row no-gutters class="d-flex justify-center">
        <v-form>
          <v-date-picker v-model="bookingInfos" color="info lighten-1" range></v-date-picker>
          <v-col class="d-flex justify-space-between">
            <v-btn
              :disabled="bookingInfos && bookingInfos.length !== 2 || JSON.stringify(untouchedBooking) === JSON.stringify(bookingInfos)"
              color="info" class="mr-4" @click="updateBookingInfos(dialogBookingInfos)">Modifier</v-btn>
            <v-btn color="warning" @click="deleteConfirmation = true">Annuler</v-btn>
          </v-col>
        </v-form>
      </v-row>
    </v-dialog>
    <v-dialog v-model="deleteConfirmation" width="500" content-class="custom-dialog">
      <v-row no-gutters class="d-flex justify-center">
        <v-form>
          <h3>Voulez-vous vraiment supprimer cette réservation ?</h3>
          <v-col class="d-flex justify-center">
            <v-btn class="mr-4" color="error" @click="deleteBookingInfos(dialogBookingInfos)">Supprimer</v-btn>
            <v-btn @click="deleteConfirmation = false">Annuler</v-btn>
          </v-col>
        </v-form>
      </v-row>
    </v-dialog>
    <v-dialog v-model="showReview" max-width="850px" content-class="custom-dialog">
      <FormReview :booking="bookingToReview" @close="showReview = false" />
    </v-dialog>
    <!-- <ErrorMessageHandling v-if="errorMessage" :error-message="errorMessage" /> -->
  </v-container>
</template>
<script>
import { format } from 'date-fns'
import { mapState, mapActions, mapGetters } from 'vuex'
import FormReview from '~/components/formReview.vue'
export default {
  components: {
    FormReview,
  },
  data() {
    return {
      headers: [
        { text: 'van_id', value: 'van_id' },
        { text: 'user_id', value: 'user_id' },
        { text: 'Marque', value: 'model' },
        { text: 'Capacity', value: 'capacity' },
        { text: "description", value: 'description' },
        { text: 'price', value: 'price' },
      ],
      showCard: false,
      allBookings: null,
      errorMessage: null,
      bookingInfos: null,
      dialogBookingInfos: null,
      showBooking: false,
      deleteConfirmation: false,
      untouchedBooking: null,
      showReview: false,
      bookingToReview: null,
    }
  },
  computed: {
    ...mapState('vans', ['vans']),
    ...mapGetters('vans', ['getVansWithPictures']),
    ...mapState('bookings', ['bookings', 'bookingReviews']),
    ...mapState('users', ['connectedUser']),
    vansWithPictures() {
      const vansWithPictures = []
      for (const van of this.vans) {
        const pictures = this.getVansPicturesByVanId[van.vanId]
        if (pictures && pictures.length > 0) {
          vansWithPictures.push({
            ...van,
            readableImage: pictures[0].readableImage,
          })
        }
      }
      return vansWithPictures
    },
  },
  watch: {
    bookings: {
      handler(newBookings) {
        const allBookingsFromThisUser = JSON.parse(JSON.stringify(newBookings.filter(b => b.userId === this.connectedUser.userId)))
        for (const booking of allBookingsFromThisUser) {
          const vanForTheBooking = this.getVansWithPictures.find(v => v.vanId === booking.vanId)
          booking.van = vanForTheBooking
        }
        const orderedBookings = allBookingsFromThisUser.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime()
        const dateB = new Date(b.startDate).getTime()
        return dateA - dateB
      })
        this.allBookings = orderedBookings
      },
      immediate: true,
    },
  },
  created() {
    this.init()
  },

  methods: {
    ...mapActions('bookings', ['updateBooking', 'deleteBooking']),
    format,
    init() {
      const allBookingsFromThisUser = JSON.parse(JSON.stringify(this.bookings.filter(b => b.userId === this.connectedUser.userId)))
      for (const booking of allBookingsFromThisUser) {
        const vanForTheBooking = this.getVansWithPictures.find(v => v.vanId === booking.vanId)
        booking.van = vanForTheBooking
      }
      const orderedBookings = allBookingsFromThisUser.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime()
        const dateB = new Date(b.startDate).getTime()
        return dateA - dateB
      })
      this.allBookings = orderedBookings
    },
    showBookingDialog({ value, booking }) {
      this.showBooking = value
      this.bookingInfos = [booking.startDate, booking.endDate]
      this.untouchedBooking = JSON.parse(JSON.stringify(this.bookingInfos))
      console.log('this.bookingInfos:', this.bookingInfos)
      this.dialogBookingInfos = booking
    },
    async updateBookingInfos(dialogBookingInfos) {
      try {
        await this.updateBooking({ date: this.bookingInfos, booking: dialogBookingInfos })
        this.showBooking = false
      } catch (error) {
        this.errorMessage = error
      }
    },
    async deleteBookingInfos(dialogBookingInfos) {
      try {
        await this.deleteBooking(dialogBookingInfos.bookingId)
        this.deleteConfirmation = false
        this.showBooking = false
      } catch (error) {
        this.errorMessage = error
      }
    },
    makeReview(booking) {
      this.showReview = true
      this.bookingToReview = booking
    }
  },
}
</script>
<style>
.custom-dialog {
  background-color: rgb(32, 31, 31);
}
</style>