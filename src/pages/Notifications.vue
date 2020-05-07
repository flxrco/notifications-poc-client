<template>
  <div class="fit flex column justify-center items-center">
    <div class="flex row no-wrap" id="btnContainer">
      <q-btn v-for="type in types" :key="type" color="primary" @click="sendNotification(type)">Send {{ type }} notification</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import NotificationType from '../models/notifications/notification-type.enum'

@Component
export default class Notifications extends Vue {
  types = [NotificationType.DISCUSSION, NotificationType.MEETING, NotificationType.TYPE, NotificationType.GOAL]

  async sendNotification (type: NotificationType) {
    await this.$axios.post('/broadcast/notification', null, {
      params: {
        message: 'GOD JONAL',
        type
      }
    })
    this.$q.notify(`Submitted ${type} notification`)
  }
}
</script>

<style lang="scss" scoped>
#btnContainer > *:not(:last-child) {
  margin-right: 10px;
}
</style>
