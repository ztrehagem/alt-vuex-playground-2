import Vue from 'vue'
import * as store from '@/store2'

Vue.prototype.$store = store

declare module 'vue/types/vue' {
  interface Vue {
    readonly $store: typeof store
  }
}
