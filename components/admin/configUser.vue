<template>
  <v-container>
    <v-row no-gutters class="flex-column text-center">
      <v-col v-if="user">
        <h2>Configuration Utilisateur : {{ user.firstName }} {{ user.lastName }} (id :{{ user.userId }})</h2>
      </v-col>
      <v-col>
        <v-btn color="warning" @click="showUpdate = true">Modifier les infos</v-btn>
        <v-btn color="error" @click="deleteItem()">Supprimer</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="showUpdate" max-width="850px" content-class="custom-dialog">
        <FormUpdateUser :user="user" @close="showUpdate = false, $emit('close')" />
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  props: {
    user: {
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
  watch: {},
  created() {
    this.init()
  },
  methods: {
    ...mapActions('users', ['deleteUser']),
    init() {},
    deleteItem() {
      this.deleteUser(this.user.userId)
      this.$emit('close')
    },
  }
}
</script>
<style>
.custom-dialog {
  background-color: rgb(32, 31, 31);
}
</style>