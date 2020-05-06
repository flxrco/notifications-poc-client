<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import notificationWsSvc from 'src/services/notification-ws.service'

@Component
export default class App extends Vue {
  mounted () {
    notificationWsSvc.connect()
  }
}
</script>
