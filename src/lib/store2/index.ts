import Vue from 'vue'

export abstract class Store<S> {
  protected $state: S

  constructor(state: S) {
    this.$state = Vue.observable(state)
  }

  get state() {
    return this.$state as Readonly<S>
  }
}
