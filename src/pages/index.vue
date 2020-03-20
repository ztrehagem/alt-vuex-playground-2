<template lang="pug">
div
  h1 App
  hr
  Foo
  hr
  Session
</template>

<script lang="ts">
import Vue from 'vue'
import Foo from '@/components/Foo.vue'
import Session from '@/components/Session.vue'

export default Vue.extend({
  components: {
    Foo,
    Session,
  },
})
</script>
