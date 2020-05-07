import { MutationTree } from 'vuex'
import { NotificationState } from './state'
import Notification from 'src/models/notifications/notification.interface'

const mutation: MutationTree<NotificationState> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },

  addNotifications (state, notifs: Notification[]) {
    const ids = new Set(state.notifications.map(notif => notif.id))
    notifs = notifs.filter(notif => !ids.has(notif.id))
    state.notifications = [...state.notifications, ...notifs].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }

}

export default mutation
