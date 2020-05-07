import { MutationTree } from 'vuex'
import { AuthState } from './state'

const mutation: MutationTree<AuthState> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },

  setLoggedInUser (state, username) {
    state.username = username
  }
}

export default mutation
