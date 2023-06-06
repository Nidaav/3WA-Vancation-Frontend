<template>
  <v-container>
    <v-row class="d-flex justify-center" >
      <h1>Demande{{allBookings.length > 1 ? 's' :'' }} de réservation </h1>
    </v-row>
    <v-row>
      <v-col v-for="(booking, index) in allBookings" :key="index" cols="12" md="6" sm="12">
        <v-card class="my-1">
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
              <v-col>{{ booking.status }}</v-col>
            </v-row>
            <v-row class="d-flex justify-space-between mt-2">
              <v-btn class="mx-2 my-2" :disabled="booking.status === 'acceptée'" color="info" @click="acceptProcess(booking)">Accepter</v-btn>
              <v-btn class="mx-2 my-2" :disabled="booking.status === 'refusée'" color="error" @click="refuseProcess(booking)">Refuser</v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="acceptConfirmation" width="500">
      <v-row no-gutters class="d-flex justify-center">
        <v-form>
          <h3>Voulez-vous accepter cette réservation ?</h3>
          <v-col class="d-flex justify-center">
            <v-btn color="info" class="mr-4" @click="acceptBooking()">Accepter</v-btn>
            <v-btn @click="acceptConfirmation = false">Annuler</v-btn>
          </v-col>
        </v-form>
      </v-row>
    </v-dialog>
    <v-dialog v-model="deleteConfirmation" width="500">
      <v-row no-gutters class="d-flex justify-center">
        <v-form>
          <h3>Voulez-vous refuser cette réservation ?</h3>
          <v-col class="d-flex justify-center">
            <v-btn color="error" class="mr-4" @click="refuseBooking()">Refuser</v-btn>
            <v-btn @click="deleteConfirmation = false">Annuler</v-btn>
          </v-col>
        </v-form>
      </v-row>
    </v-dialog>
    <!-- <ErrorMessageHandling v-if="errorMessage" :error-message="errorMessage" /> -->
  </v-container>
</template>
<script>
import { format } from 'date-fns'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'VansPage',
  components: {},
  data() {
    return {
      showCard: false,
      allBookings: null,
      errorMessage: null,
      bookingInfos: null,
      dialogBookingInfos: null,
      showBooking: false,
      deleteConfirmation: false,
      acceptConfirmation: false,
      bookingAboutToBeChanged: null,
    }
  },
  computed: {
    ...mapState('vans', ['vans']),
    ...mapGetters('vans', ['getVansWithPictures']),
    ...mapState('bookings', ['bookings', 'bookingReviews']),
    ...mapState('users', ['connectedUser']),
  },
  watch: {
    bookings: {
      handler(newBookings) {
        const allBookingsFromThisUser = JSON.parse(JSON.stringify(newBookings.filter(b => b.userId === this.connectedUser.userId)))
        for (const booking of allBookingsFromThisUser) {
          const vanForTheBooking = this.getVansWithPictures.find(v => v.vanId === booking.vanId)
          booking.van = vanForTheBooking
        }
        this.allBookings = allBookingsFromThisUser
      },
      immediate: true,
    },
  },
  created() {
    this.init()
  },

  methods: {
    ...mapActions('bookings', ['acceptBookingStatus', 'refuseBookingStatus']),
    format,
    init() {
      const allBookingsFromThisUser = JSON.parse(JSON.stringify(this.bookings.filter(b => b.orgId === this.connectedUser.orgId)))
      for (const booking of allBookingsFromThisUser) {
        const vanForTheBooking = this.getVansWithPictures.find(v => v.vanId === booking.vanId)
        booking.van = vanForTheBooking
      }
      this.allBookings = allBookingsFromThisUser
    },
    acceptProcess(booking) {
      this.acceptConfirmation = true
      this.bookingAboutToBeChanged = booking
    },
    refuseProcess(booking) {
      this.deleteConfirmation = true
      this.bookingAboutToBeChanged = booking
    },
    async acceptBooking() {
      await this.acceptBookingStatus(this.bookingAboutToBeChanged)
      this.acceptConfirmation = false
      this.bookingAboutToBeChanged = null
    },
    async refuseBooking() {
      await this.refuseBookingStatus(this.bookingAboutToBeChanged)
      this.deleteConfirmation = false
      this.bookingAboutToBeChanged = null
    },
  },
}
</script>
<style></style>