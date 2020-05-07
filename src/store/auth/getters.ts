import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { AuthState } from './state'

const getters: GetterTree<AuthState, StoreInterface> = {
  someAction (/* context */) {
    // your code
  },
  isLoggedIn ({ username }) {
    return !!username
  }
}

export default getters
