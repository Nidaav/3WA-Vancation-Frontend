<template>
	<v-form v-model="valid">
    <h2>Modifier mes informations :</h2>
		<v-container class="d-flex">
			<v-row no-gutters>
				<v-col cols="12">
					<v-text-field v-model="formInfos.firstName" :rules="nameRules" label="Prénom" required></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field v-model="formInfos.lastName" :rules="nameRules" label="Nom" required></v-text-field>
				</v-col>

				<v-col cols="12">
					<v-text-field v-model="formInfos.email" :rules="emailRules" label="E-mail" required></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex justify-center mt-4">
					<v-btn :disabled="!valid || isLoading ||  isTheSame" color="info" class="mr-4" @click="register">
						Modifier
					</v-btn>

					<v-btn color="warning" @click="reset">
						Annuler
					</v-btn>
					<!-- <v-btn color="info" to="/login" class="ml-4">Se connecter</v-btn> -->
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
	data: () => ({
		valid: false,
		isLoading: false,
		newUser: { firstName: '', lastName: '', email: '', password: '' },
		nameRules: [
			v => !!v || 'Ce champ est requis',
			v => v.length <= 14 || 'Ce champ doit faire moins de 14 caractères',
		],
		emailRules: [
			v => !!v || 'Ce champ est requis',
			v => /.+@.+/.test(v) || 'E-mail must be valid',
		],
		passwordRules: [
			v => !!v || 'Ce champ est requis',
		],
		errorMessage: null,
    formInfos: null,
    untouchedFormInfos: null,
	}),
  computed: {
    ...mapState('users', ['connectedUser']),
    isTheSame() {
      return JSON.stringify(this.untouchedFormInfos) === JSON.stringify(this.formInfos) 
    }
  },
  created() {
    this.init()
  },

	methods: {
		...mapActions('users', ['createUser', 'updateUser']),
    init() {
      this.formInfos = JSON.parse(JSON.stringify(this.connectedUser))
      this.untouchedFormInfos = JSON.parse(JSON.stringify(this.formInfos))
    },
		async register() {
			this.isLoading = true
      console.log('this.formInfos:', this.formInfos)
			try {
				const registerInfos = await this.updateUser(this.formInfos)
				console.log('registerInfos:', registerInfos)
				// this.$router.push('/login');
			} catch (error) {
				this.errorMessage = error
			}
			this.isLoading = false
		},
		reset() {
			this.formInfos = JSON.parse(JSON.stringify(this.connectedUser))
		},
	}
}
</script>