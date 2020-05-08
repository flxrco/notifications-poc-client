<template>
  <q-btn flat dense round :icon="icon">
    <NotificationMenu />
    <q-badge color="red" floating v-if="hasUnread">{{ unreadCount }}</q-badge>
  </q-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import NotificationMenu from './NotificationMenu.vue'
import { mapGetters } from 'vuex'

@Component({
  components: { NotificationMenu },
  computed: {
    ...mapGetters('notification', ['unreadCount'])
  }
})
export default class NotificationButton extends Vue {
  unreadCount!: number;

  get hasUnread (): boolean {
    return this.unreadCount > 0
  }

  get icon (): string {
    return this.hasUnread ? 'notification_important' : 'notifications'
  }
}
</script>
