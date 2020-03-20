<template lang="pug">
div
  h2 Session
  div isLoggedIn: {{ isLoggedIn }}
  div(v-if="isLoggedIn")
    button(@click="logout" :disabled="disabled") logout
  div(v-else)
    input(type="text" v-model="email" placeholder="email")
    input(type="password" v-model="password" placeholder="password")
    button(@click="login" :disabled="disabled") login
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    email: '',
    password: '',
  }),

  computed: {
    isLoggedIn() {
      return this.$store.session.state.isLoggedIn
    },

    disabled() {
      return this.$store.session.state.processing
    },
  },

  methods: {
    async login() {
      try {
        await this.$store.session.actions.login(this.email, this.password)
      } catch (error) {
        console.warn(error?.errors)
      }
    },

    async logout() {
      try {
        await this.$store.session.actions.logout()
      } catch (error) {
        console.warn(error?.errors)
      }
    },
  },
})
</script>
