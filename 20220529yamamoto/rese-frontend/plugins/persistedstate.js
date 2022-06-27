import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'reseAuthState',
    paths: [
      'user',
    ],
  })(store)
}