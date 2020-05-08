import { MutationTree } from 'vuex'
import { NotificationState } from './state'
import _ from 'lodash'
import Notification from 'src/models/notifications/notification.interface'

const mutation: MutationTree<NotificationState> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },

  addNotifications (state, notifs: Notification[]) {
    const ids = new Set(state.notifications.map(notif => notif.id))
    notifs = notifs.filter(notif => !ids.has(notif.id))
    const merged = [...state.notifications, ...notifs].sort((b, a) => a.createdAt.getTime() - b.createdAt.getTime())
    state.notifications = merged
  },

  markAsRead (state, id: number) {
    const notif = _.find(state.notifications, notif => notif.id === id)
    if (!notif || notif.readAt) {
      return
    }

    notif.readAt = new Date()
  },

  clearNotifications (state) {
    state.notifications = []
  }

}

export default mutation
