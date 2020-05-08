import SockJS from 'sockjs-client'
import { RxStomp } from '@stomp/rx-stomp'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IMessage } from '@stomp/stompjs'
import Notification from 'src/models/notifications/notification.interface'

const { WS_URL, STOMP_DEST } = process.env

export class NotificationWSService {
  private stomp: RxStomp;

  private _notifications$!: Observable <IMessage>

  constructor () {
    const socket = SockJS(WS_URL || 'http://localhost:8080/notifications-websocket')
    const stomp = this.stomp = new RxStomp()

    stomp.configure({
      debug: msg => console.log(msg),
      webSocketFactory: () => socket
    })

    this._notifications$ = this.stomp.watch(STOMP_DEST || '/queue/notifications')
  }

  connect () {
    this.stomp.activate()
  }

  disconnect () {
    this.stomp.deactivate()
  }

  get notifications$ (): Observable<Notification> {
    return this._notifications$
      .pipe(
        map(({ body }) => {
          const data = JSON.parse(body)

          return {
            id: data.notificationID,
            username: data.author,
            createdAt: new Date(data.createdAt),
            readAt: data.readAt ? new Date(data.readAt) : null,
            message: data.message,
            type: data.type
          } as Notification
        })
      )
  }
}

const notificationWsSvc = new NotificationWSService()
export default notificationWsSvc
