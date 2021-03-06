<template>
  <q-menu>
    <q-list style="min-width: 300px">
      <q-item v-for="notif in notifications" :key="notif.id" clickable v-ripple @click="onNotificationClick(notif)">
        <q-item-section avatar>
          <q-avatar :icon="notif.type | notifAvatar" text-color="white" color="secondary"></q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <strong>{{ notif.username }}</strong> sent you a <span class="text-caption">{{ notif.type }}</span> notification.
          </q-item-label>
          <q-item-label caption> {{ notif.createdAt | minutesFromNow }}m ago</q-item-label>
        </q-item-section>
        <q-item-section side v-show="notif.readAt">
          <q-item-label caption>
            seen
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mapState, mapActions, mapMutations } from 'vuex'
import { AxiosInstance } from 'axios'
import { DateTime } from 'luxon'
import Notification from '../models/notifications/notification.interface'
import NotificationType from '../models/notifications/notification-type.enum'
import MarkAsReadPayload from '../models/vuex/mark-as-read-payload.interface'
import NotifService from 'src/services/notification-ws.service'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

@Component({
  methods: {
    ...mapActions('notification', ['fetchNotifications', 'markAsRead']),
    ...mapMutations('notification', ['addNotifications'])
  },
  computed: {
    ...mapState('notification', ['notifications']),
    ...mapState('auth', ['username'])
  },
  filters: {
    minutesFromNow: (date: Date) => Math.round(Math.abs(DateTime.fromJSDate(date).diffNow('minutes').minutes)),
    notifAvatar: (type: NotificationType) => {
      switch (type) {
        case NotificationType.DISCUSSION:
          return 'question_answer'
        case NotificationType.MEETING:
          return 'assignment_ind'
        case NotificationType.TYPE:
          return 'keyboard'
        case NotificationType.GOAL:
          return 'flag'
      }
    }
  }
})
export default class NotificationMenu extends Vue {
  // from vuex
  notifications!: Notification[]
  username!: string
  fetchNotifications!: (axios: AxiosInstance) => Promise<void>
  markAsRead!: (pl: MarkAsReadPayload) => Promise<void>
  addNotifications!: (notifs: Notification[]) => void

  // from filters
  minutesFromNow!: (date: Date) => string;
  notifAvatar!: (type: NotificationType) => string;

  // rxjs babyyyyy
  notifSub!: Subscription;

  mounted () {
    this.fetchNotifications(this.$axios)
    this.notifSub = NotifService.notifications$
      .pipe(filter(data => data.username !== this.username))
      .subscribe(data => this.addNotifications([data]))
  }

  async onNotificationClick (notification: Notification) {
    if (notification.readAt) {
      return
    }

    await this.markAsRead({ $axios: this.$axios, notification })
    this.$q.notify(`Notification #${notification.id} has been marked as read.`)
  }
}
</script>
