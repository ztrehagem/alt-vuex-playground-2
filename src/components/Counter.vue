<template lang="pug">
div
  h2 Counter
  div count: {{ count }}
  div
    button(@click="increment") increment
    button(@click="decrement") decrement
  div
    input(type="number" v-model="input")
    button(@click="add") add
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    input: '',
  }),

  computed: {
    count() {
      return this.$store.counter.state.count
    },
  },

  methods: {
    increment() {
      this.$store.counter.actions.increment()
    },

    decrement() {
      this.$store.counter.actions.decrement()
    },

    add() {
      this.$store.counter.actions.add(Number(this.input))
    },
  },
})
</script>
