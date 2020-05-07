import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { AuthState } from './state'
import AxiosPayload from 'src/models/vuex/axios-payload.interface'
import { AxiosInstance } from 'axios'

export interface LoginPayload extends AxiosPayload {
  username: string;
}

const actions: ActionTree<AuthState, StoreInterface> = {
  someAction (/* context */) {
    // your code
  },

  async login (context, payload: LoginPayload) {
    const { $axios, username } = payload
    await $axios.post('/login', { username })
    context.commit('setLoggedInUser', username)
  },

  async logout (context, $axios: AxiosInstance) {
    await $axios.post('/logout')
    context.commit('setLoggedInUser', null)
  }
}

export default actions
