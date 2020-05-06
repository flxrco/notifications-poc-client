<template>
  <q-layout>

    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Notifications POC
        </q-toolbar-title>

        <q-btn flat dense round icon="notifications" />
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
