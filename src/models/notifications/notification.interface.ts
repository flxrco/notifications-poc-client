import NotificationType from './notification-type.enum'

export default interface Notification {
  createdAt: Date;
  readAt: Date | null;
  type: NotificationType;
  id: number;
  username: string;
  message: string;
}
