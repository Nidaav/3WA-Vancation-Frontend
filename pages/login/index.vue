<template>
  <v-container class="d-flex">
    <v-form v-if="!userIsConnected" v-model="valid">
      <v-row>
        <v-col cols="12">
          <h3>Connexion</h3>
          <v-text-field v-model="loginConn.email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="loginConn.password" :rules="passwordRules" label="Password" required></v-text-field>
        </v-col>
        <v-col class="d-flex justify-space-around" cols="12" sm="9">
          <v-btn :disabled="!valid || isLoading" color="info" class="" @click="login">
            Se connecter
          </v-btn>
          <v-btn color="info" to="/login/register">M'inscrire</v-btn>
        </v-col>
      </v-row>
      <v-row>
      </v-row>
    </v-form>
    <v-row v-else class="flex-column">
      <v-col>
        <h3>Votre profil</h3>
      </v-col>
      <v-col class="">
        <h4>
          Prénom : {{ connectedUser.firstName }}
        </h4>
        <h4>
          Nom : {{ connectedUser.lastName }}
        </h4>
        <h4>
          Email : {{ connectedUser.email }}
        </h4>
        <h4>
          Mot de passe : *********
        </h4>
        <h4>
          Date d'inscription : {{ format(new Date(connectedUser.signUpDate), 'dd/MM/yyyy') }}
        </h4>
        <h4>
          Role : {{ connectedUser.role === 3 ? 'Administrateur' : connectedUser.role === 2 ? 'Organisation' :
            'Utilisateur' }}
        </h4>
      </v-col>
      <v-col v-if="connectedUser.role === 2">
        <h4>
          Organisation a laquelle vous êtes rattaché : {{ orgs.find(o => o.orgId === connectedUser.orgId).orgName }}
        </h4>
      </v-col>

      <v-col>
        <v-btn color="info" to="/profile" class="mb-2 mr-2">Modifier mes informations</v-btn>
        <v-btn color="warning" class="mb-2" @click="logout" >Me déconnecter</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { format } from 'date-fns'
import { mapActions, mapState } from 'vuex'
export default {
  data: () => ({
    valid: false,
    isLoading: false,
    loginConn: {
      email: '',
      password: ''
    },
    emailRules: [
      v => !!v || 'Ce champ est requis',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Ce champ est requis',
    ],
  }),
  computed: {
    ...mapState('users', ['connectedUser']),
    ...mapState('orgs', ['orgs']),
    userIsConnected() {
      return this.connectedUser
    }
  },
  created() {
    this.init()
  },
  methods: {
    format,
    ...mapActions('users', ['loginUser', 'logoutUser']),
    init() {
    },
    async login() {
      this.isLoading = true
      try {
        const loginInfos = await this.loginUser(this.loginConn)
        console.log('loginInfos:', loginInfos)
        const lastVisitedPage = sessionStorage.getItem('lastVisitedPage');
        if (lastVisitedPage) {
          this.$router.push(lastVisitedPage);
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        console.log('error:', error)
        this.errorMessage = error
        this.reset()
      }
      this.isLoading = false
    },
    async logout() {
      this.isLoading = true
      try {
        console.log('this.loginConn:', this.loginConn)
        const loginInfos = await this.logoutUser()
        console.log('loginInfos:', loginInfos)
        // this.$router.push('/');

      } catch (error) {
        console.log('error:', error)
        this.errorMessage = error
      }
      this.isLoading = false
    },
  }
}
</script>
<style></style>
