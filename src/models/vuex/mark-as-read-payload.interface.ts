import AxiosPayload from './axios-payload.interface'
import Notification from '../notifications/notification.interface'

export default interface MarkAsReadPayload extends AxiosPayload {
  notification: Notification;
}
