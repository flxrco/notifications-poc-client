import NotificationType from './notification-type.enum'

export default interface Notification {
  createdAt: Date;
  readAt: Date;
  type: NotificationType;
  id: number;
}
