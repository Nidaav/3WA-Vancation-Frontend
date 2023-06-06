<template>
      <v-row no-gutters class="d-flex justify-center">
        <v-form v-if="vanInfos">
          <h2>Modifier les informations :</h2>
          <v-container class="d-flex">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field v-model="vanInfos.model" label="Modèle du véhicule / Marque" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="vanInfos.capacity" label="Nombre de places" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field v-model="vanInfos.description" label="Description" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field v-model="vanInfos.price" label="Prix par jour (€)" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-file-input label="Ajouter des photos"></v-file-input>
              </v-col>
              <v-col cols="12" class="d-flex justify-center mt-4">
                <v-btn :disabled="JSON.stringify(untouchedVan) === JSON.stringify(vanInfos)" color="info"  class="mr-4" @click="updateVanInfos()" >Modifier</v-btn>
                <v-btn color="warning" @click="$emit('close')">Annuler</v-btn>                
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-row>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'VansPage',
  components: {},
  props: {
    van: {
      type: Object, 
      default: null,
    },
  },
  data() {
    return {
      errorMessage: null,
      vanInfos: {},
      untouchedVan: null,
      showDialog: false,
    }
  },
  computed: {
    ...mapState('vans', ['vans']),
    ...mapGetters('vans', ['getVansPicturesByVanId']),
    ...mapState('bookings', ['bookingReviews']),
    ...mapState('orgs', ['orgs']),
    ...mapState('users', ['connectedUser']),
  },
  watch: {
    van() {
      this.init()
    }
  },
  created() {
    this.init()
  },

  methods: {
    ...mapActions('vans', ['updateVan']),

    init() {
      console.log('van formUpdate:', this.van)
      this.vanInfos = JSON.parse(JSON.stringify(this.van))
      this.untouchedVan = JSON.parse(JSON.stringify(this.vanInfos))
    },

    async updateVanInfos() {
      try {
        await this.updateVan(this.vanInfos)
        this.vanInfos = null
        this.untouchedVan = null
        this.$emit('close')
      } catch (error) {
        this.errorMessage = error
      }
    },
  },
}
</script>
<style>
</style>