<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Component } from 'vue-property-decorator'
import notificationWsSvc from 'src/services/notification-ws.service'
import { AxiosInstance } from 'axios'

@Component({
  methods: {
    ...mapActions('auth', ['logout'])
  }
})
export default class App extends Vue {
  async mounted () {
    notificationWsSvc.connect()
    await this.logout(this.$axios)
  }

  logout!: ($axios: AxiosInstance) => Promise<void>

  // getSession!: (axios: AxiosInstance) => Promise<void>
}
</script>
