import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { NotificationState } from './state'
import { AxiosInstance } from 'axios'
import Notification from 'src/models/notifications/notification.interface'

const actions: ActionTree<NotificationState, StoreInterface> = {
  async fetchNotifications ({ commit }, axios: AxiosInstance) {
    const notifs = await axios.get<Notification[]>('/notifications')
    commit('addNotifications', notifs)
  }
}

export default actions
