import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    searched: [],
    page: 1,
    buttonLoading: false,
    searchQuery: '',
    loading: true,
    isEnding: false,
  },
  reducers: {
    replaceGames(state, action) {
      return {
        ...state,
        games: action.payload.games,
        page: state.page + 1,
        loading: false,
      };
    },
    loadMoreGames(state, action) {
      if (state.searchQuery) {
        state.searched = [...state.searched, ...action.payload.moreGames];
        state.searchPage++;
      } else {
        state.games = [...state.games, ...action.payload.moreGames];
        state.page++;
      }
      state.buttonLoading = false;
      state.isEnding = action.payload.isEnding;
    },
    searchGames(state, action) {
      return {
        ...state,
        searched: action.payload.searchResults,
        searchPage: state.searchPage + 1,
        searchQuery: action.payload.searchQuery,
        loading: false,
      };
    },
    clearSearch(state) {
      return {
        ...state,
        searched: [],
        searchQuery: '',
        isEnding: false,
      };
    },
    loading(state) {
      state.loading = true;
    },
    loadingButton(state) {
      state.buttonLoading = true;
    },
  },
});

export const {
  replaceGames,
  searchGames,
  clearSearch,
  loadMoreGames,
  loadingButton,
  resetPage,
  loading,
} = gamesSlice.actions;
export default gamesSlice.reducer;
