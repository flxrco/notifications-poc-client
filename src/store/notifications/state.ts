import Notification from 'src/models/notifications/notification.interface'

export interface NotificationState {
  notifications: Notification[];
}

const state: NotificationState = {
  notifications: []
}

export default state
