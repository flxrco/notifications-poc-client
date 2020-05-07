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

  async login ({ commit }, payload: LoginPayload) {
    const { $axios, username } = payload
    await $axios.post('/auth/login', null, { params: { username } })
    commit('setLoggedInUser', username)
  },

  async logout ({ commit }, $axios: AxiosInstance) {
    await $axios.post('/auth/logout')
    commit('setLoggedInUser', null)
  },

  async getSession ({ commit }, $axios: AxiosInstance) {
    const { data } = await $axios.get('/auth/session')
    if (data) {
      commit('setLoggedInUser', data)
    }
  }
}

export default actions
