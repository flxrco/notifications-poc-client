<template>
  <q-menu>
    <q-list style="min-width: 300px">
      <q-item v-for="notif in notifications" :key="notif.id" clickable v-ripple @click="onNotificationClick">
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
import { mapState, mapActions } from 'vuex'
import { AxiosInstance } from 'axios'
import { DateTime } from 'luxon'
import Notification from '../models/notifications/notification.interface'
import NotificationType from '../models/notifications/notification-type.enum'

@Component({
  methods: {
    ...mapActions('notification', ['fetchNotifications'])
  },
  computed: {
    ...mapState('notification', ['notifications'])
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
  fetchNotifications!: (axios: AxiosInstance) => Promise<void>

  // from filters
  minutesFromNow!: (date: Date) => string;
  notifAvatar!: (type: NotificationType) => string;

  mounted () {
    this.fetchNotifications(this.$axios)
  }

  onNotificationClick (notif: Notification) {
    console.log(notif)
  }
}
</script>
