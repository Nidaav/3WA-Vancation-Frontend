<template>
	<v-container>

		<v-row class="flex-column">
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des vans mis en location</h2>
				</v-col>
				<v-data-table :headers="headersVans" :items="vans" sort-by="lastSeen" sort-desc class="elevation-1" fixed-header
					hide-default-footer :items-per-page=-1 dense>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({ item: item, type: 'van' })">Configurer</v-btn>
					</template>
				</v-data-table>
				<v-dialog v-model="showConfigVan" max-width="650px" max-height="400px" content-class="custom-dialog">
					<ConfigVan :van="toConfig" @close="closeDialog" />
				</v-dialog>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des utilisateurs inscrits</h2>
					<v-spacer></v-spacer>
					<v-btn small class="teal darken-1" @click="showCreateUser = true">Ajouter</v-btn>
				</v-col>
				<v-data-table :headers="headersUsers" :items="users" sort-by="lastSeen" sort-desc class="elevation-1" fixed-header
					hide-default-footer :items-per-page=-1 dense>
					<template #[`item.signUpDate`]="{ item }">
						{{ JSON.stringify(new Date(item.signUpDate)).split('T')[0].split('"')[1] }}
					</template>
					<template #[`item.role`]="{ item }">
						{{ item.role === 3 ? 'Admin' : item.role === 2 ? 'Organisation' : 'Utilisateur' }}
					</template>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({ item: item, type: 'user' })">Configurer</v-btn>
					</template>
				</v-data-table>
				<v-dialog v-model="showConfigUser" max-width="650px" max-height="400px" content-class="custom-dialog">
					<ConfigUser :user="toConfig" @close="closeDialog" />
				</v-dialog>
				<v-dialog v-model="showCreateUser" max-width="650px" max-height="400px" content-class="custom-dialog">
					<v-row no-gutters class="flex-column py-4 px-4">
						<v-col>
							<v-text-field v-model="newUser.firstName" label="Prénom" required></v-text-field>
						</v-col>
						<v-col>
							<v-text-field v-model="newUser.lastName" label="Nom" required></v-text-field>
						</v-col>
						<v-col>
							<v-text-field v-model="newUser.email" label="E-mail" required></v-text-field>
						</v-col>
						<v-col>
							<v-text-field v-model="newUser.password" label="Mot de passe" required></v-text-field>
						</v-col>
						<v-col>
							<v-select v-model="newUser.role" :items="roles" item-text="name" label="Role" required></v-select>
						</v-col>
						<v-col class="d-flex justify-space-around mt-4">
							<v-btn color="info" @click="register">
								Créer
							</v-btn>
							<v-btn color="warning" @click="reset">
								effacer
							</v-btn>
						</v-col>
					</v-row>
				</v-dialog>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des organisations de location</h2>
				</v-col>
				<v-data-table :headers="headersOrgs" :items="orgs" sort-by="lastSeen" sort-desc class="elevation-1" fixed-header
					hide-default-footer :items-per-page=-1 dense>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({ item: item, type: 'org' })">Configurer</v-btn>
					</template>
				</v-data-table>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des réservations</h2>
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
						<v-btn small text color="info" @click.stop="editItem({ item: item, type: 'booking' })">Configurer</v-btn>
					</template>
				</v-data-table>
			</v-col>
			<v-col>
				<v-col class="d-flex">
					<h2>Liste des retours</h2>
				</v-col>
				<v-data-table :headers="headersBookingReviews" :items="bookingReviews" sort-by="lastSeen" sort-desc
					class="elevation-1" fixed-header :items-per-page=30 dense>
					<template #[`item.config`]="{ item }">
						<v-btn small text color="info" @click.stop="editItem({ item: item, type: 'review' })">Configurer</v-btn>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ConfigVan from '~/components/admin/configVan.vue'
import ConfigUser from '~/components/admin/configUser.vue'
export default {
	name: 'VansPage',
	components: { ConfigVan, ConfigUser },
	data() {
		return {
			headersVans: [
				{ text: 'vanId', value: 'vanId' },
				{ text: 'orgId', value: 'orgId' },
				{ text: 'Marque', value: 'model' },
				{ text: 'Capacity', value: 'capacity' },
				{ text: 'price', value: 'price' },
				{ text: '', value: 'config' }
			],
			headersUsers: [
				{ text: 'userId', value: 'userId' },
				{ text: 'firstName', value: 'firstName' },
				{ text: 'lastName', value: 'lastName' },
				{ text: 'email', value: 'email' },
				{ text: 'role', value: 'role' },
				{ text: "signUpDate", value: 'signUpDate' },
				{ text: '', value: 'config' }
			],
			headersOrgs: [
				{ text: 'orgId', value: 'orgId' },
				{ text: 'vanIds', value: 'vanIds' },
				{ text: 'orgName', value: 'orgName' },
				{ text: '', value: 'config' }
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
				{ text: '', value: 'config' }
			],
			headersBookingReviews: [
				{ text: 'reviewId', value: 'reviewId' },
				{ text: 'bookingId', value: 'bookingId' },
				{ text: 'rating', value: 'rating' },
				{ text: 'comment', value: 'comment' },
				{ text: '', value: 'config' }
			],
			roles: [{ value: 1, name: 'utilisateur' }, { value: 2, name: 'organisation' }, { value: 3, name: 'administrateur' }],
			showConfigVan: false,
			showConfigUser: false,
			showConfigOrg: false,
			showConfigBooking: false,
			showConfigReview: false,
			toConfig: null,
			showCreateUser: false,
			newUser: {},
		}
	},
	computed: {
		...mapState('vans', ['vans']),
		...mapState('users', ['users', 'connectedUser']),
		...mapState('orgs', ['orgs']),
		...mapState('bookings', ['bookings', 'bookingReviews']),
	},
	watch: {},
	created() {
		this.init()
	},

	methods: {
		...mapActions('users', ['createUser']),
		init() {
		},
		editItem({ item, type }) {
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
		},
		closeDialog() {
			this.showConfigVan = false
			this.showConfigUser = false
			this.showConfigOrg = false
			this.showConfigBooking = false
			this.showConfigReview = false
			this.toConfig = null
		},
		async register() {
			try {
				await this.createUser(this.newUser)
				this.showCreateUser = false
			} catch (error) {
			console.log('error:', error)
			}
		},
		reset() {
			this.newUser = {}
		},
	},
}
</script>
<style>
.custom-dialog {
	background-color: rgb(32, 31, 31);
}
</style>