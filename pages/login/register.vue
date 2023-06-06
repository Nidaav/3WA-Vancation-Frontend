<template>
	<v-form v-model="valid">
		<v-container class="flex-column">
			<v-row no-gutters>
				<v-col cols="12">
					<v-text-field v-model="newUser.firstName" :rules="nameRules" label="Prénom" required></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field v-model="newUser.lastName" :rules="nameRules" label="Nom" required></v-text-field>
				</v-col>

				<v-col cols="12">
					<v-text-field v-model="newUser.email" :rules="emailRules" label="E-mail" required></v-text-field>
				</v-col>

				<v-col cols="12">
					<v-text-field v-model="newUser.password" :rules="passwordRules" label="Mot de passe" required></v-text-field>
				</v-col>
				<v-col cols="12" class="d-flex justify-space-around mt-4">
					<v-btn :disabled="!valid || isLoading" color="info" @click="register">
						M'inscrire
					</v-btn>
					
					<v-btn color="warning" @click="reset">
						effacer
					</v-btn>
				</v-col>
				<v-col cols="12" class="d-flex justify-center mt-4">
					<v-btn color="info" to="/login">Se connecter</v-btn>
				</v-col>
			</v-row>
			<v-row no-gutters class="d-flex text-center align-center mt-6">
				<v-col>
					<h4>Je suis une société qui souhaite débuter un partenariat avec
						Vancation</h4>
					<v-btn outlined disabled to="/login" class="mt-3">Nous contacter</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>
<script>
import { mapActions } from 'vuex'
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
		errorMessage: null
	}),
	methods: {
		...mapActions('users', ['createUser']),
		async register() {
			this.isLoading = true
			try {
				const registerInfos = await this.createUser(this.newUser)
				console.log('registerInfos:', registerInfos)
				this.$router.push('/login');
			} catch (error) {
				this.errorMessage = error
			}
			this.isLoading = false
		},
		reset() {
			this.$refs.form.reset()
		},
	}
}
</script>