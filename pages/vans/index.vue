<template>
  <v-container class="container">
    <v-row class="d-flex justify-center mx-12">
      <v-select v-model="location" :items="locations" label="Ville de départ" single-line
        prepend-icon="mdi-map-marker"></v-select>
    </v-row>
    <v-row>
      <v-col v-for="van in vansToDisplay" :key="van.vanId" cols="12" md="6" sm="12">
        <v-card class="my-1">
          <v-card-title>{{ van.model }}</v-card-title>
          <v-carousel>
            <v-carousel-item v-for="(picture, i) in van.readablePictures" :key="i" :src="picture">
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating :value="getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).stars" color="info" dense
                half-increments readonly size="14"></v-rating>
              <v-col class="grey--text ms-4">
                {{ getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).stars + ' (' +
                  getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).reviewsNumber + ')' }}
              </v-col>
            </v-row>

            <div class="my-4 text-subtitle-1">
              {{ van.price }} € / jour • {{ van.capacity }} places
            </div>

            <div>{{ van.description }}</div>
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
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'VansPage',
  components: {},
  data() {
    return {
      model: 0,
      location: 'Rennes',
      locations: ['Rennes', 'Saint Malo', 'Saint Brieuc', 'Vannes', 'Lorient', 'Brest'],
    }
  },
  computed: {
    ...mapState('vans', ['vans']),
    ...mapGetters('vans', ['getVansWithPictures']),
    ...mapGetters('bookings', ['getReviewsAndStarsByVan']),
  },
  watch: {
    location() {
      setTimeout(this.init(), 500)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.vansToDisplay = this.shuffleArray(JSON.parse(JSON.stringify(this.getVansWithPictures)))
    },
    shuffleArray(array) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [
          shuffledArray[randomIndex],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    }
  },
}
</script>
<style></style>