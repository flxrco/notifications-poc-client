<template>
  <div class="fit">
    <div class="row" id="container">
      <q-form class="col-xs-12 col-sm-10 offset-sm-1 col-md-4 offset-md-4">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Log In</div>
            <div class="text-body2">Please enter a username</div>
          </q-card-section>

          <q-card-section class="q-my-md">
            <q-input bottom-slots clearable="" class="q-mr-xs flex-fill" label="Username" v-model="username" >
              <template #after>
                <q-btn icon="mood" round flat color="primary" @click="onGenerateBtnClick">
                  <q-tooltip>Generate a random username with <em>Faker.js</em></q-tooltip>
                </q-btn>
              </template>

              <template #hint>
                Having a hard time deciding on your username? Click the <em>smiley</em> button!
              </template>

            </q-input>
          </q-card-section>
          <q-separator />
          <q-card-section class="flex row justify-end">
            <q-btn color="primary" @click="onLoginBtnClick" >Proceed</q-btn>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import faker from 'faker'
import { Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { LoginPayload } from '../store/auth/actions'

@Component({
  methods: {
    ...mapActions('auth', ['login'])
  }
})
export default class Login extends Vue {
  username = ''

  login!: (payload: LoginPayload) => Promise<void>

  onGenerateBtnClick () {
    this.username = faker.internet.userName()
  }

  async onLoginBtnClick () {
    await this.login({
      $axios: this.$axios,
      username: this.username
    })
    await this.$router.push({ name: 'home' })
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding-top: 10rem;
}
</style>
