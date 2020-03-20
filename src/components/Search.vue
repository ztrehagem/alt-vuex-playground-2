<template lang="pug">
div
  h2 Search
  div result: {{ result }}
  div
    input(type="text" placeholder="keywords" v-model="keywords")
    button(@click="search") search
</template>

<script lang="ts">
import Vue from 'vue'
import SearchApi from '@/api/search'
import { CancelError } from '../app/errors/cancel-error'

export default Vue.extend({
  data: () => ({
    api: new SearchApi(),
    keywords: '',
    result: null,
  }),

  methods: {
    async search() {
      try {
        this.result = await this.api.execute({ q: this.keywords })
      } catch (error) {
        if (error instanceof CancelError) {
          console.log('canceled')
        } else {
          console.warn(error)
        }
      }
    },
  },
})
</script>
