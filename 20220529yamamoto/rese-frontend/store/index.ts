import { getterTree, mutationTree, actionTree, getAccessorType } from 'typed-vuex';
import { User } from '~/types/api';

export const state = () => ({
  /* 店舗検索情報 */
  regionSearchId: '',
  genreSearchId: '',
  searchWord:  '',
  /* ログイン中のユーザー情報 */
  user: {
    id: 0,
    group: 0,
    name: '',
    email: '',
  } as User,
  token: '',
});

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  loggedIn: (state: RootState): boolean => state.user.id ? true : false,
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
  setUser(state: RootState, user: User): void {
    state.user = user;
  },
  clearUser(state: RootState): void {
    state.user = {
      id: 0,
      group: 0,
      name: '',
      email: '',
    };
  },
  setToken(state: RootState, token: string): void {
    state.token = token;
  },
  clearToken(state: RootState): void {
    state.token = '';
  },
});

export const actions = actionTree({state, mutations}, {
  clearSearchKeys({commit}) {
    commit('setRegionSearchId', '');
    commit('setGenreSearchId', '');
    commit('setSearchWord', '');
  },
});

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})