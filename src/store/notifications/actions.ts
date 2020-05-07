import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { NotificationState } from './state'
import { AxiosInstance } from 'axios'
import Notification from 'src/models/notifications/notification.interface'

const actions: ActionTree<NotificationState, StoreInterface> = {
  async fetchNotifications ({ commit }, axios: AxiosInstance) {
    let { data: notifs } = await axios.get<Notification[]>('/notifications')
    notifs = notifs.map(notif => ({
      ...notif,
      createdAt: new Date(notif.createdAt),
      readAt: notif.readAt ? new Date(notif.readAt) : null
    }))
    commit('addNotifications', notifs)
  }
}

export default actions
