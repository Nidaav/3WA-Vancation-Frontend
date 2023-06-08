<template>
  <v-alert
      dense
      prominent
      type="error"
    >
    {{ handleAxiosMessageError(errorMessage) }}
    </v-alert>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: [Object, String, Error],
      required: true
    }
  },
  methods: {
    handleAxiosMessageError(error) {
      let errorMessage = null
      if (error.response) {
        errorMessage = error.response.data.error
      } else if (error.request) {
        errorMessage = error.request
      } else if (error.message) {
        errorMessage = error.message
      } else {
        errorMessage = error
      }
      return errorMessage
    }
  }
}
</script>
