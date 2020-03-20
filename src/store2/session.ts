import { Store } from '../lib/store2'
import LoginApi from '../api/login'
import LogoutApi from '../api/logout'
import { counter } from './'

class State {
  processing = false
  isLoggedIn = false
}

export default class extends Store<State> {
  constructor() {
    super(new State())
  }

  async synchronize(fn: () => Promise<any>) {
    if (this.$state.processing) return
    this.$state.processing = true
    try {
      await fn()
    } finally {
      this.$state.processing = false
    }
  }

  async login(email: string, password: string) {
    await this.synchronize(async () => {
      await new LoginApi().execute({ email, password })
      counter.increment()
      this.$state.isLoggedIn = true
    })
  }

  async logout() {
    await this.synchronize(async () => {
      await new LogoutApi().execute()
      this.$state.isLoggedIn = false
    })
  }
}
