import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { NotificationState } from './state'
import { AxiosInstance } from 'axios'
import Notification from 'src/models/notifications/notification.interface'
import MarkAsReadPayload from 'src/models/vuex/mark-as-read-payload.interface'

const actions: ActionTree<NotificationState, StoreInterface> = {
  async fetchNotifications ({ commit, rootState }, $axios: AxiosInstance) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await $axios.get<any[]>('/notifications')
    const notifs = data
      .map(notif => ({
        ...notif,
        id: notif.notificationID,
        username: notif.author,
        createdAt: new Date(notif.createdAt),
        readAt: notif.readAt ? new Date(notif.readAt) : null
      }) as Notification)
      .filter(notif => notif.username !== rootState.auth.username)
    commit('addNotifications', notifs)
  },

  async markAsRead ({ commit }, { $axios, notification }: MarkAsReadPayload) {
    if (notification.readAt) {
      return
    }

    await $axios.post('/notification/read', undefined, {
      params: { id: notification.id }
    })

    commit('markAsRead', notification.id)
  }
}

export default actions
