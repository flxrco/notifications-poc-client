import SockJS from 'sockjs-client'
import { RxStomp } from '@stomp/rx-stomp'
import { Observable } from 'rxjs'
import { IMessage } from '@stomp/stompjs'

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

    this._notifications$ = this.stomp.watch(STOMP_DEST || '/receive/notifications')
  }

  connect () {
    this.stomp.activate()
  }

  disconnect () {
    this.stomp.deactivate()
  }

  get notifications$ (): Observable<IMessage> {
    return this._notifications$
  }
}

const notificationWsSvc = new NotificationWSService()
export default notificationWsSvc
