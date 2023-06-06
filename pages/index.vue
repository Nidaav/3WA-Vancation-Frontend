<template>
  <div class="home">
    <header class="banner">
      <ErrorMessageHandling v-if="errorMessage" :error-message="errorMessage" />
      <div class="background-effect">
        <div class="title section-banner">
          <h1 class="title-home">Vancation</h1>
        </div>
        <div class="description section-banner">
          <p class="description-home"><em>Louez un camping-car, fourgon ou van aménagé et voyagez dans toute l'Europe
              !</em></p>
        </div>
        <!-- TODO: placer des section (permet de regrouper des sections et articles) et articles (ne contient que des p, img, titres etc) -->
        <!-- TODO: placer un footer -->
        <div class="btn-home">
          <v-btn to="/vans" class="btn-discover all-vans">Voir les vans</v-btn>
        </div>
      </div>
    </header>
    <main>
      <div id="lessvg" class="container-svgs">
        <div class="box-flex-column">
          <div class="box-svg box-svg-1">
            <div class="box-number">
              <p>1</p>
            </div>
          </div>
          <div class="box-title">
            <p>Louez un vehicule</p>
          </div>
        </div>
        <div class="box-flex-column">
          <div class="box-svg box-svg-2">
            <div class="box-number">
              <p>2</p>
            </div>
          </div>
          <div class="box-title">
            <p>Profitez de vos vacances</p>
          </div>
        </div>
        <div class="box-flex-column">
          <div class="box-svg box-svg-3">
            <div class="box-number">
              <p>3</p>
            </div>
          </div>
          <div class="box-title">
            <p>Faites un retour d'expérience</p>
          </div>
        </div>
      </div>
      <div class="container-text-img">
        <div class="dflex-container">
          <div class="right-home-info ">
            <h1><em>L'esprit Van</em></h1>
            <p>Laissez nous deviner… Vous avez envie de vous évader le temps d’un week-end, d’une semaine… ou de partir en
              road trip en France, en Europe, ou sur nos magnifiques territoires d’Outre mer plus longtemps encore ? </p>
            <p>Vous êtes en quête d’originalité, de différence… de nouveauté ? Vous aspirez à l’imprévu, à
              <strong>l’aventure</strong>… à la liberté ? Avez-vous pensé à la location d’un van aménagé (ou campervan) ?
            </p>
            <p>A un <strong>road trip</strong> à bord d’un véhicule totalement autonome, combi California à toit relevable
              ou fourgon aménagé, pour découvrir une nouvelle forme de liberté et de voyage ? Bienvenue chez
              <strong>Vancation</strong>, spécialiste des vacances itinérantes et séjours nomades !
            </p>
          </div>
          <div class="left-home-info">
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ErrorMessageHandling from "~/components/ErrorMessageHandling.vue";
export default {
  name: 'HomePage',
  components: {
    ErrorMessageHandling
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      console.log('this.$route.query.message:', this.$route.query.message)
      if (this.$route.query.message)
        this.errorMessage = this.$route.query.message;
    },
  }
}
</script>
<style>
@import '~/assets/stylesheets/pages/_home.scss';
</style>