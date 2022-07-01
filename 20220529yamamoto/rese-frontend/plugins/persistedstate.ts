import { Context } from '@nuxt/types';
import createPersistedState from 'vuex-persistedstate';

export default ({ store }: Context): void => {
  createPersistedState({
    key: 'reseAuthState',
    paths: [
      'user',
      'token',
    ],
  })(store);
}