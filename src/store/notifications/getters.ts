import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { NotificationState } from './state'

const getters: GetterTree<NotificationState, StoreInterface> = {
  unreadCount (state) {
    return state.notifications.filter(notif => !notif.readAt).length
  },

  hasNotifications (state, getters) {
    return getters.unreadCount > 0
  }
}

export default getters
