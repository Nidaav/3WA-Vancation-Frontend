<template>
      <v-row no-gutters class="d-flex justify-center">
        aze
      <v-form v-if="userInfos">
    <h2>Modifier mes informations :</h2>
		<v-container class="d-flex">
			<v-row no-gutters>
				<v-col cols="12">
					<v-text-field v-model="userInfos.firstName" label="Prénom" required></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field v-model="userInfos.lastName" label="Nom" required></v-text-field>
				</v-col>

				<v-col cols="12">
					<v-text-field v-model="userInfos.email" label="E-mail" required></v-text-field>
				</v-col>
        <v-col cols="12">
					<v-select  v-model="userInfos.role" :items="roles" item-text="name" label="Role" required></v-select>
				</v-col>
				<v-col cols="12" class="d-flex justify-center mt-4">
					<v-btn :disabled="JSON.stringify(untouchedUser) === JSON.stringify(userInfos)" color="info" class="mr-4" @click="register">
						Modifier
					</v-btn>

          <v-btn color="warning" @click="$emit('close')">Annuler</v-btn>                
				</v-col>
			</v-row>
		</v-container>
	</v-form>
      </v-row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'VansPage',
  components: {},
  props: {
    user: {
      type: Object, 
      default: null,
    },
  },
  data() {
    return {
      errorMessage: null,
      userInfos: {},
      untouchedVan: null,
      showDialog: false,
      roles: [{value: 1, name: 'utilisateur'},{value: 2, name: 'organisation'}, {value: 3, name: 'administrateur'}]
    }
  },
  computed: {},
  watch: {
    user() {
      this.init()
    }
  },
  created() {
    this.init()
  },

  methods: {
    ...mapActions('users', ['updateUser']),

    init() {
      console.log('user formUpdate:', this.user)
      this.userInfos = JSON.parse(JSON.stringify(this.user))
      this.untouchedUser = JSON.parse(JSON.stringify(this.userInfos))
    },
    async register() {
      console.log('this.userInfos:', this.userInfos)
			try {
				await this.updateUser(this.userInfos)
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