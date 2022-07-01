import { getterTree, mutationTree, actionTree, getAccessorType } from 'typed-vuex';
import { user } from '~/types/api';

export const state = () => ({
  regionSearchId: undefined as (number | undefined),
  genreSearchId: undefined as (number | undefined),
  searchWord:  undefined as (string | undefined),
  /* ログイン中のユーザー情報 */
  user: {} as (user | {}),
  token: undefined as (string | undefined),
});

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  loggedIn: (state: RootState): number => Object.keys(state.user).length,
});

export const mutations = mutationTree(state, {
  setRegionSearchId(state: RootState, regionSearchId: (number | undefined)): void {
    state.regionSearchId = regionSearchId;
  },
  setGenreSearchId(state, genreSearchId: (number | undefined)): void {
    state.genreSearchId = genreSearchId;
  },
  setSearchWord(state: RootState, searchWord: (string | undefined)): void {
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
  clearState({commit}) {
    commit('setRegionSearchId', undefined);
    commit('setGenreSearchId', undefined);
    commit('setSearchWord', undefined);
  }
});

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})