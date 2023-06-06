<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <v-col class="">
        <img src="../assets/images/vancation-02.png" alt="logo" width="400" height="200">
      </v-col>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-if="user.user">{{ user.user.userId + ' ' + user.user.firstName + ' ' + user.user.lastName }} {{ user.roleInfo ? '(' + user.roleInfo + ')' : ''}}</v-toolbar-title>
      <!-- <v-toolbar-title v-else>Vous n'êtes pas connecté pour le moment</v-toolbar-title> -->
      <!-- <v-spacer /> -->
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'Vancation Accueil',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Vans',
          to: '/vans',
        },
        // TODO: trouver pq le boulon (mdi-settings) se charge pas
        {
          icon: 'mdi-settings',
          title: 'Admin',
          to: '/ad_min',
        },
        {
          icon: 'mdi-settings',
          title: 'Gérer les vans',
          to: '/vans/orgVans',
        },
        {
          icon: 'mdi-settings',
          title: 'Gérer les réservations',
          to: '/bookings/orgBookings',
        },
        {
          icon: 'mdi-settings',
          title: 'Voir mes réservations',
          to: '/bookings',
        },
        {
            icon: 'mdi-settings',
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
      console.log('this.connectedUser:', this.connectedUser)
      if (this.connectedUser && this.connectedUser.role === 2) {
        roleInfo = this.orgs.find(o => o.orgId === this.connectedUser.orgId).orgName
      } else if (this.connectedUser && this.connectedUser.role === 3) {
        roleInfo = 'Admin'
      }
      return {user : this.connectedUser, roleInfo}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
  },
}
</script>