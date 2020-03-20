import * as lib from '../lib/store'
import LoginApi from '../api/login'
import LogoutApi from '../api/logout'
import * as store from './index'

export class State {
  processing = false
  isLoggedIn = false
}

export class Actions extends lib.Actions<State> {
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
      store.counter.actions.increment()
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

export default lib.createModuleClass({ State, Actions })
