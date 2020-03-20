import Vue from 'vue'
import { readonly } from './utils'

export interface Class<T, A extends any[] = any[]> {
  new (...args: A): T
}

export class Actions<S> {
  protected $state: S

  constructor($state: S) {
    this.$state = $state
  }
}

export interface ModuleOptions<S, A extends Actions<S>> {
  State: Class<S>
  Actions: Class<A, [S]>
}

export class Module<S, A extends Actions<S>> {
  public state: Readonly<S>
  public actions: A

  constructor({ State, Actions }: ModuleOptions<S, A>) {
    const vState = Vue.observable<S>(new State())
    this.state = readonly(vState)
    this.actions = new Actions(vState)
  }
}

export function createModuleClass<S, A extends Actions<S>>(
  options: ModuleOptions<S, A>,
): Class<Module<S, A>, []> {
  return class extends Module<S, A> {
    constructor() {
      super(options)
    }
  }
}
