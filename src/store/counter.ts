import * as lib from '../lib/store'
import { session } from './index'

export class State {
  count = 0
}

export class Actions extends lib.Actions<State> {
  increment() {
    this.$state.count++
  }

  decrement() {
    this.$state.count--
    session.actions.logout()
  }

  add(value: number) {
    this.$state.count += value
  }
}

export default lib.createModuleClass({ State, Actions })
