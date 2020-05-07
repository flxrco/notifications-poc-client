<template>
  <div class="fit flex column justify-center items-center">
    <div class="flex row no-wrap" id="btnContainer">
      <q-btn v-for="type in types" :key="type" color="primary" @click="sendNotification(type)">Send notification type {{ type }}</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Notifications extends Vue {
  types = [1, 2, 3, 4]

  async sendNotification (type: number) {
    await this.$axios.post('/broadcast/notification', { type })
    this.$q.notify(`Submitted notification type ${type}`)
  }
}
</script>

<style lang="scss" scoped>
#btnContainer > *:not(:last-child) {
  margin-right: 10px;
}
</style>
