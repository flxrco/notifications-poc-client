import { Module } from 'vuex'
import { StoreInterface } from '../index'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state, { NotificationState } from './state'

const module: Module<NotificationState, StoreInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default module
