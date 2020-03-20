<template lang="pug">
div
  h1 App
  hr
  Counter
  hr
  Session
  hr
  Search
</template>

<script lang="ts">
import Vue from 'vue'
import Counter from '@/components/Counter.vue'
import Session from '@/components/Session.vue'
import Search from '@/components/Search.vue'

export default Vue.extend({
  components: {
    Counter,
    Session,
    Search,
  },
})
</script>
