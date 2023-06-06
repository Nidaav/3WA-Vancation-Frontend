
<template>
  <v-container>
    <v-row no-gutters class="flex-column text-center">
      <v-col v-if="van">
        <h2>Configuration Van {{ van.model }} (id :{{ van.vanId }})</h2>
      </v-col>
      <v-col>
        <v-btn color="warning" @click="showUpdate = true">Modifier les infos</v-btn>
        <v-btn color="error" @click="deleteItem()">Supprimer</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="showUpdate" max-width="850px" content-class="custom-dialog">
        <FormUpdateVan :van="van" @close="showUpdate = false, $emit('close')" />
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  props: {
    van: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showUpdate: false,
    }
  },
  computed: {},
  watch: {
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('vans', ['deleteVan']),
    init() {
      console.log('van configVan:', this.van)
    },
    deleteItem() {
      this.deleteVan(this.van.vanId)
      this.$emit('close')
    },
  }
}
</script>
<style></style>