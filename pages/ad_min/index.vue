<template>
	<v-container>

		<v-row class="flex-column">
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des vans mis en location</h2>
					<v-spacer></v-spacer>
					<v-btn small class="teal darken-1">Ajouter</v-btn>
				</v-col>
				<v-data-table :headers="headersVans" :items="vans" sort-by="lastSeen" sort-desc class="elevation-1" fixed-header
					hide-default-footer :items-per-page=-1 dense>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({item: item, type: 'van'})">Configurer</v-btn>
					</template>
				</v-data-table>
				<v-dialog v-model="showConfigVan" max-width="650px" max-height="400px" content-class="custom-dialog">
					<ConfigVan :van="toConfig" @close="closeDialog"/>
    		</v-dialog>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des utilisateurs inscrits</h2>
					<v-spacer></v-spacer>
					<v-btn small class="teal darken-1">Ajouter</v-btn>
				</v-col>
				<v-data-table :headers="headersUsers" :items="users" sort-by="lastSeen" sort-desc class="elevation-1" fixed-header
					hide-default-footer :items-per-page=-1 dense>
					<template #[`item.signUpDate`]="{ item }">
						{{ JSON.stringify(new Date(item.signUpDate)).split('T')[0].split('"')[1] }}
					</template>
					<template #[`item.role`]="{ item }">
						{{ item.role === 3 ? 'Admin' : item.role === 2 ? 'Organisation': 'Utilisateur'}}
					</template>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({item: item, type: 'user'})">Configurer</v-btn>
					</template>
				</v-data-table>
				<v-dialog v-model="showConfigUser" max-width="650px" max-height="400px" content-class="custom-dialog">
					<ConfigUser :user="toConfig" @close="closeDialog"/>
    		</v-dialog>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des organisations de location</h2>
					<v-spacer></v-spacer>
					<v-btn small class="teal darken-1">Ajouter</v-btn>
				</v-col>
				<v-data-table :headers="headersOrgs" :items="orgs" sort-by="lastSeen" sort-desc class="elevation-1" fixed-header
					hide-default-footer :items-per-page=-1 dense>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({item: item, type: 'org'})">Configurer</v-btn>
					</template>
				</v-data-table>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des réservations</h2>
					<v-spacer></v-spacer>
					<v-btn small class="teal darken-1">Ajouter</v-btn>
				</v-col>
				<v-data-table :headers="headersBookings" :items="bookings" sort-by="lastSeen" sort-desc class="elevation-1"
					fixed-header hide-default-footer :items-per-page=-1 dense>
					<template #[`item.startDate`]="{ item }">
						{{ JSON.stringify(new Date(item.startDate)).split('T')[0].split('"')[1] }}
					</template>
					<template #[`item.endDate`]="{ item }">
						{{ JSON.stringify(new Date(item.endDate)).split('T')[0].split('"')[1] }}
					</template>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({item: item, type: 'booking'})">Configurer</v-btn>
					</template>
				</v-data-table>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des retours</h2>
					<v-spacer></v-spacer>
					<v-btn small class="teal darken-1">Ajouter</v-btn>
				</v-col>
				<v-data-table :headers="headersBookingReviews" :items="bookingReviews" sort-by="lastSeen" sort-desc
					class="elevation-1" fixed-header hide-default-footer :items-per-page=-1 dense>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({item: item, type: 'review'})">Configurer</v-btn>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
	<!-- <ErrorMessageHandling v-if="errorMessage" :error-message="errorMessage" /> -->
</template>
<script>
import { mapState } from 'vuex'
import ConfigVan from '~/components/admin/configVan.vue'
import ConfigUser from '~/components/admin/configUser.vue'
export default {
	name: 'VansPage',
	components: {ConfigVan, ConfigUser},
	data() {
		return {
			headersVans: [
				{ text: 'vanId', value: 'vanId' },
				{ text: 'orgId', value: 'orgId' },
				{ text: 'Marque', value: 'model' },
				{ text: 'Capacity', value: 'capacity' },
				{ text: 'price', value: 'price' },
				{ text: '', value: 'config'}
			],
			headersUsers: [
				{ text: 'userId', value: 'userId' },
				{ text: 'firstName', value: 'firstName' },
				{ text: 'lastName', value: 'lastName' },
				{ text: 'email', value: 'email' },
				{ text: 'role', value: 'role' },
				{ text: "signUpDate", value: 'signUpDate' },
				{ text: '', value: 'config'}
			],
			headersOrgs: [
				{ text: 'orgId', value: 'orgId' },
				{ text: 'vanIds', value: 'vanIds' },
				{ text: 'orgName', value: 'orgName' },
				{ text: '', value: 'config'}
			],
			headersBookings: [
				{ text: 'bookingId', value: 'bookingId' },
				{ text: 'userId', value: 'userId' },
				{ text: 'vanId', value: 'vanId' },
				{ text: 'orgId', value: 'orgId' },
				{ text: "startDate", value: 'startDate' },
				{ text: "endDate", value: 'endDate' },
				{ text: "priceTotal", value: 'priceTotal' },
				{ text: "status", value: 'status' },
				{ text: '', value: 'config'}
			],
			headersBookingReviews: [
				{ text: 'reviewId', value: 'reviewId' },
				{ text: 'bookingId', value: 'bookingId' },
				{ text: 'rating', value: 'rating' },
				{ text: 'comment', value: 'comment' },
				{ text: '', value: 'config'}
			],
			showConfigVan: false,
			showConfigUser: false,
			showConfigOrg: false,
			showConfigBooking: false,
			showConfigReview: false,
			toConfig: null,
			errorMessage: null,
		}
	},
	computed: {
		...mapState('vans', ['vans']),
		...mapState('users', ['users', 'connectedUser']),
		...mapState('orgs', ['orgs']),
		...mapState('bookings', ['bookings', 'bookingReviews']),
	},
	watch: {
	},
	created() {
		this.init()
	},

	methods: {
		init() {
		},
		editItem({item, type}) {
			console.log('type:', type)
			if (type === 'van') {
				this.showConfigVan = true
			}
			if (type === 'user') {
				this.showConfigUser = true
			}
			if (type === 'org') {
				this.showConfigOrg = true
			}
			if (type === 'booking') {
				this.showConfigBooking = true
			}
			if (type === 'review') {
				this.showConfigReview = true
			}
			this.toConfig = item
			console.log('this.toConfig:', this.toConfig)
		},
		closeDialog() {
			this.showConfigVan = false
			this.showConfigUser = false
			this.showConfigOrg = false
			this.showConfigBooking = false
			this.showConfigReview = false
			this.toConfig = null
		},
	},
}
</script>
<style>
.custom-dialog {
  background-color: rgb(32, 31, 31);
}
</style>