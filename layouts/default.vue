<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app :height="connectedUser && connectedUser.role === 2 ? '256' : '208'"
      class="mx-2 mt-2 rounded-xl">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app :class="drawer ? 'ml-2' : ''">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-col class="">
        <img src="../assets/images/vancation-02.png" alt="logo" width="400" height="200">
      </v-col>
      <v-toolbar-title v-if="user.user">{{ user.user.firstName + ' ' + user.user.lastName }} {{
        user.roleInfo ? '(' + user.roleInfo + ')' : '' }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: null,
      itemsUser: [
        {
          icon: 'mdi-home-outline',
          title: 'Accueil',
          to: '/',
        },
        {
          icon: 'mdi-van-passenger',
          title: 'Les vans',
          to: '/vans',
        },
        {
          icon: 'mdi-book-open-variant',
          title: 'Voir mes réservations',
          to: '/bookings',
        },
        {
          icon: 'mdi-account-settings',
          title: 'Mon profil',
          to: '/login',
        }
      ],
      itemsOrg: [
        {
          icon: 'mdi-home-outline',
          title: 'Accueil',
          to: '/',
        },
        {
          icon: 'mdi-van-passenger',
          title: 'Les vans',
          to: '/vans',
        },
        {
          icon: 'mdi-car-estate',
          title: 'Gérer vos vans',
          to: '/vans/orgVans',
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Gérer vos réservations',
          to: '/bookings/orgBookings',
        },
        {
          icon: 'mdi-account-settings',
          title: 'Mon profil',
          to: '/login',
        }
      ],
      itemsAdmin: [
        {
          icon: 'mdi-home-outline',
          title: 'Accueil',
          to: '/',
        },
        {
          icon: 'mdi-van-passenger',
          title: 'Les vans',
          to: '/vans',
        },
        {
          icon: 'mdi-shield-half-full',
          title: 'Admin',
          to: '/ad_min',
        },
        {
          icon: 'mdi-account-settings',
          title: 'Mon profil',
          to: '/login',
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    ...mapState('users', ['connectedUser']),
    ...mapState('orgs', ['orgs']),
    user() {
      let roleInfo = null
      if (this.connectedUser && this.connectedUser.role === 2) {
        roleInfo = this.orgs.find(o => o.orgId === this.connectedUser.orgId).orgName
      } else if (this.connectedUser && this.connectedUser.role === 3) {
        roleInfo = 'Admin'
      }
      return { user: this.connectedUser, roleInfo }
    }
  },
  watch: {
    user() {
      if (!this.connectedUser) {
        this.items = this.itemsUser
      } else if (this.connectedUser && this.connectedUser.role === 2 ){
        this.items = this.itemsOrg
      } else if (this.connectedUser && this.connectedUser.role === 3) {
        this.items = this.itemsAdmin
      } else {
        this.items = this.itemsUser
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.items = this.itemsUser
    },
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda&display=swap');
</style>