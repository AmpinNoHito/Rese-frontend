import { getterTree, mutationTree, actionTree, getAccessorType } from 'typed-vuex';
import { user } from '~/types/api';

export const state = () => ({
  regionSearchId: '' as string,
  genreSearchId: '' as string,
  searchWord:  '' as string,
  /* ログイン中のユーザー情報 */
  user: {} as (user | {}),
  token: undefined as (string | undefined),
});

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  loggedIn: (state: RootState): number => Object.keys(state.user).length,
});

export const mutations = mutationTree(state, {
  setRegionSearchId(state: RootState, regionSearchId: string): void {
    state.regionSearchId = regionSearchId;
  },
  setGenreSearchId(state, genreSearchId: string): void {
    state.genreSearchId = genreSearchId;
  },
  setSearchWord(state: RootState, searchWord: string): void {
    state.searchWord = searchWord;
  },
  setUser(state: RootState, user: (user | {})): void {
    state.user = user;
  },
  setToken(state: RootState, token: (string | undefined)): void {
    state.token = token;
  }
});

export const actions = actionTree({state, mutations}, {
  clearSearchKeys({commit}) {
    commit('setRegionSearchId', '');
    commit('setGenreSearchId', '');
    commit('setSearchWord', '');
  }
});

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})