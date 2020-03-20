import Vue from 'vue'
import * as store from '@/store'

Vue.prototype.$store = store

declare module 'vue/types/vue' {
  interface Vue {
    readonly $store: typeof store
  }
}
