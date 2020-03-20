import { Store } from '../lib/store2'
import { session } from './'

export class State {
  count = 0
}

export default class extends Store<State> {
  constructor() {
    super(new State())
  }

  increment() {
    this.$state.count++
  }

  decrement() {
    this.$state.count--
    session.logout()
  }

  add(value: number) {
    this.$state.count += value
  }
}
