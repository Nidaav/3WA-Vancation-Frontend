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
        // The request was made and the server responded with errorMessage status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.error
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorMessage = error.request
      } else if (error.message) {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message
      } else {
        errorMessage = error
      }
      return errorMessage
    }
  }
}
</script>
