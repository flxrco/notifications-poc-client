<template>
  <q-layout>

    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Notifications POC
        </q-toolbar-title>

        <!-- contains the notification menu/dropdown -->
        <NotificationButton />

        <!-- contains logout -->
        <q-btn flat dense rounde icon="account_circle">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="face" color="primary" />
                </q-item-section>
                <q-item-section>
                  {{ username }}
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-ripple @click="onLogoutBtn">
                <q-item-section avatar>
                  <q-icon name="exit_to_app" color="primary"/>
                </q-item-section>
                <q-item-section>
                  Log Out
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
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
import { mapActions, mapState, mapMutations } from 'vuex'
import { AxiosInstance } from 'axios'
import NotificationButton from '../components/NotificationButton.vue'

@Component({
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapMutations('notification', ['clearNotifications'])
  },
  computed: {
    ...mapState('auth', ['username'])
  },
  components: { NotificationButton }
})
export default class PocLayout extends Vue {
  logout!: ($axios: AxiosInstance) => Promise<void>
  clearNotifications!: () => void

  async onLogoutBtn () {
    await this.logout(this.$axios)
    await this.$router.push({ name: 'login' })
    this.clearNotifications()
    this.$q.notify('You have been logged out.')
  }

  username!: string

  beforeDestroy () {
    this.logout(this.$axios)
  }
}
</script>
