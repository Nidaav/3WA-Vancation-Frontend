<template>
	<v-form>
		<v-container class="flex-column">
      <v-row no-gutters>
        <h4>Faites votre retour d'expérience </h4>
      <v-col cols="12">
					<v-select  v-model="stars" :items="starsData" label="Laissez une note sur 5" required></v-select>
				</v-col>
				<v-col cols="12">
					<v-textarea v-model="review"  label="Laissez un commentaire (facultatif)" required></v-textarea>
				</v-col>
			</v-row>
			<v-row no-gutters class="d-flex text-center align-center mt-6">
				<v-col>
					<v-btn :disabled="!stars" color="info" @click="saveReview">Poster</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    booking: {
      type: Object, 
      default: null,
    },
  },
	data: () => ({
    review: null,
    stars: null,
    starsData: [ 1, 2, 3, 4, 5],
    errorMessage: null,
	}),
  created() {
    this.init(
    )
  },
	methods: {
		...mapActions('bookings', ['createReview']),
    init() {
      console.log('this.booking:', this.booking)
    },
		async saveReview() {
      console.log('this.stars:', this.stars)
      console.log('this.review:', this.review)
      const review = {review : this.review, stars: this.stars, vanId: this.booking.vanId }
			try {
				const registerInfos = await this.createReview(review)
				console.log('registerInfos:', registerInfos)
				this.$emit('close');
			} catch (error) {
				this.errorMessage = error
			}
		},
		reset() {
			this.$refs.form.reset()
		},
	}
}
</script>