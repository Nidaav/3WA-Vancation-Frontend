<template>
  <v-row no-gutters>
    <v-card v-if="van">
      <v-card-title>{{ van.model }}</v-card-title>
      <v-carousel>
        <v-carousel-item v-for="(picture, i) in images" :key="i" :src="picture">
        </v-carousel-item>
      </v-carousel>
      <v-card-text>
        <v-row align="center" class="mx-0">
            <v-rating :value="reviews.stars" color="info" dense half-increments readonly size="14"></v-rating>
            <v-col class="grey--text ms-4">
              {{ reviews.stars + ' (' +  reviews.reviewsNumber + ')' }}
            </v-col>
          </v-row>
        <v-row class="flex-column">
          <v-col class="text-subtitle-1">
            {{ van.price }} € / jour • {{ van.capacity }} places
          </v-col>
          <v-col>{{ van.description }}</v-col>
          <v-col class="d-flex justify-space-between">
            <v-btn color="info" @click="showBookingDialog(!showBooking)">Réserver ce van</v-btn>       
            <v-btn to="/vans">Retour</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-row v-if="reviews" no-gutters class="flex-column mx-0 pt-3 px-4 grey--text">
        <h4>Avis locataires ({{ reviews.reviews.length }} commentaires)</h4>
        <v-col v-for="(review, i) in reviews.reviews" :key="i" class="pt-4">
        <p class="font-italic">
          - {{ review }}
        </p>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="showBooking" content-class="custom-dialog" width="290">
      <v-row no-gutters class="flex-column">
        <v-col>
          <v-date-picker v-model="bookingInfos" color="info" range></v-date-picker>
        </v-col>
        <v-col class="d-flex justify-space-between">
          <v-btn :disabled="new Date(bookingInfos[0]).getTime() < new Date().getTime() || new Date(bookingInfos[1]).getTime() < new Date().getTime()" class="mx-2 my-2" color="info" @click="addBooking">Réserver</v-btn>
          <v-btn class="mx-2 my-2" @click="showBooking = false">Annuler</v-btn>
        </v-col>
      </v-row>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'VanPage',
  data() {
    return {
      van: null,
      errorMessage: null,
      showBooking: false,
      bookingInfos: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      images: null,
      reviews: null
    }
  },
  computed: {
    ...mapState('vans', ['vans']),
    ...mapState('users', ['connectedUser']),
    ...mapGetters('vans', ['getVansWithPictures']),
    ...mapGetters('bookings', ['getReviewsAndStarsByVan']),
  },
  watch: {},
  created() {
    this.init()
  },

  methods: {
    ...mapActions('bookings', ['createBooking']),
    init() {
      this.van = this.vans.find(van => van.vanId === Number(this.$route.params.van))
      this.images = this.getVansWithPictures.find(van => van.vanId === this.van.vanId).readablePictures
      this.reviews = this.getReviewsAndStarsByVan.find(r => r.vanId === this.van.vanId)
    },
    showBookingDialog(value) {
      this.showBooking = value
    },
    async addBooking() {
      const user = this.connectedUser
      try {
        await this.createBooking({ dates: this.bookingInfos, van: this.van, user })
        this.$router.push('/bookings');
      } catch (error) {
        console.log('error:', error)
      }
    },
  },
}
</script>
<style>
.custom-dialog {
  background-color: rgb(32, 31, 31);
}
</style>