<template>
  <q-layout>

    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Notifications POC
        </q-toolbar-title>

        <q-btn flat dense round icon="notifications" />
        <q-btn flat dense round icon="exit_to_app" @click="onLogoutBtn">
          <q-tooltip>
            Log Out
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="absolute-full">
          <router-view></router-view>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { AxiosInstance } from 'axios'

@Component({
  methods: {
    ...mapActions('auth', ['logout'])
  }
})
export default class PocLayout extends Vue {
  logout!: ($axios: AxiosInstance) => Promise<void>

  async onLogoutBtn () {
    await this.logout(this.$axios)
    await this.$router.push({ name: 'login' })
    this.$q.notify('You have been logged out.')
  }
}
</script>
