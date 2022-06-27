export const state = () => ({
  regionSearchId: 0,
  genreSearchId: 0,
  searchWord: '',
  /* ログイン中のユーザー情報 */
  user:'',
});

export const mutations = {
  setRegionSearchId(state, regionSearchId) {
    state.regionSearchId = regionSearchId;
  },
  setGenreSearchId(state, genreSearchId) {
    state.genreSearchId = genreSearchId;
  },
  setSearchWord(state, searchWord) {
    state.searchWord = searchWord;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  clearState({commit}) {
    commit('setRegionSearchId', '');
    commit('setGenreSearchId', '');
    commit('setSearchWord', '');
  }
};