import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { NotificationState } from './state'

const getters: GetterTree<NotificationState, StoreInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
