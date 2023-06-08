<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <h1>Vos vans</h1>
    </v-row>
    <v-row>
      <v-col v-for="van in getOrgVansWithPictures" :key="van.vanId" cols="12" md="6" sm="12">
        <v-card class="my-1">
          <v-card-title>{{ van.model }}</v-card-title>
          <v-carousel>
            <v-carousel-item v-for="(picture, i) in van.readablePictures" :key="i" :src="picture">
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <v-row align="center" class="mx-0">
            <v-rating :value="getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).stars" color="info" dense half-increments readonly size="14"></v-rating>
            <v-col class="grey--text ms-4">
              {{ getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).stars + ' (' +  getReviewsAndStarsByVan.find(r => r.vanId === van.vanId).reviewsNumber + ')' }}
            </v-col>
          </v-row>
            
            <div class="my-4 text-subtitle-1">
            {{ van.price }} € / jour • {{ van.capacity }} places
          </div>
          
          <div>{{ van.description }}</div>
          <v-row class="d-flex justify-space-between mt-4">
            <v-btn class="mx-2 my-2" color="info" @click="showUpdateDialog({ value: true, van: van })">Modifier ce van</v-btn>
            <v-btn class="mx-2 my-2" color="warning" @click="deleteConfirmation = true, aboutToBeDeletedVan = van">Retirer ce van</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
      <!-- DIALOGUE POUR UPDATE UN VAN -->
    </v-row>
    <v-dialog v-model="showUpdate" max-width="850px" content-class="custom-dialog">
      <FormUpdateVan :van="vanInfos" @close="showUpdateDialog({value: false, van: null})" />
    </v-dialog>
    <v-dialog v-model="deleteConfirmation" width="500" content-class="custom-dialog">
      <v-row no-gutters class="d-flex justify-center">
        <v-form>
          <h3>Voulez-vous vraiment retirer ce van de l'application ?</h3>
          <v-col class="d-flex justify-center">
            <v-btn class="mr-4" color="error" @click="deleteVan()">Supprimer</v-btn>
            <v-btn @click="deleteConfirmation = false">Annuler</v-btn>
          </v-col>
        </v-form>
      </v-row>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import FormUpdateVan from '~/components/formUpdateVan.vue'
export default {
  name: 'VansPage',
  components: {
    FormUpdateVan,
  },
  data() {
    return {
      showUpdate: false,
      vanInfos: {},
      deleteConfirmation: false,
      aboutToBeDeletedVan: null,
    }
  },
  computed: {
    ...mapGetters('vans', ['getVansWithPictures']),
    ...mapGetters('bookings', ['getReviewsAndStarsByVan']),
    ...mapState('users', ['connectedUser']),
    getOrgVansWithPictures() {
      return this.getVansWithPictures.filter(v => v.orgId === this.connectedUser.orgId)
    }
  },
  watch: {},
  created() {
    this.init()
  },
  methods: {
    ...mapActions('vans', ['updateVan', 'deleteVan']),
    init() {
    },
    showUpdateDialog(data) {
      this.vanInfos = data.van
      this.showUpdate = data.value
    },
    deleteVan() {
      this.deleteVan(this.van.vanId)
      this.deleteConfirmation = false
    },
    async updateVanInfos() {
      try {
        await this.updateVan(this.vanInfos)
        this.showUpdate = false
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