<template>
  <v-container class="container">
    <v-row>
      <!-- TODO: SEARCHBAR -->
    </v-row>

    <v-row>
      <v-col v-for="van in getVansWithPictures" :key="van.vanId" cols="12" md="6" sm="12">
        <v-card class="my-1">
          <v-card-title>{{ van.model }}</v-card-title>
        <v-carousel>
          <v-carousel-item v-for="(picture, i) in van.readablePictures" :key="i" :src="picture">
          </v-carousel-item>
        </v-carousel>
        <!-- <v-col v-for="picture in van.readablePictures" :key="picture">
          <h5>image : {{ picture }}</h5>
          <img height="250" :src="picture" alt="Photo de van" />
        </v-col> -->
        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating :value="getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).stars" color="info" dense half-increments readonly size="14"></v-rating>
            <v-col class="grey--text ms-4">
              {{ getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).stars + ' (' +  getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).reviewsNumber + ')' }}
              <!-- 4.5 (413) -->
            </v-col>
          </v-row>
          
          <div class="my-4 text-subtitle-1">
            {{ van.price }} € / jour • {{ van.capacity }} places
          </div>
          
          <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          <v-col class="d-flex justify-space-between">
            <v-btn color="info" :to="'/vans/' + van.vanId">Voir ce van</v-btn>
            <v-btn icon color="grey darken-3">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>
    </v-row>
    <!-- <ErrorMessageHandling v-if="errorMessage" :error-message="errorMessage" /> -->
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'VansPage',
  components: {},
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
      vanToShow: null,
      errorMessage: null,
      model: 0,
    }
  },
  computed: {
    ...mapState('vans', ['vans', 'vansPictures']),
    ...mapGetters('vans', ['getVansWithPictures']),
    ...mapGetters('bookings', ['getReviewsAndStarsByVan']),
    ...mapState('bookings', ['bookingReviews']),
    ...mapState('users', ['connectedUser']),
  },
  watch: {
  },
  created() {
    this.init(
    )
  },

  methods: {
    init() {
      this.vansToDisplay = this.vans
      for (const van of this.vansToDisplay) {
        van.favBoolean = false
      }
    },
  },
}
</script>
<style></style>