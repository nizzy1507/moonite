import axios from 'axios';
import { searchGameURL, gamesListURL, orderByURL } from '../../api';
import {
  replaceGames,
  searchGames,
  loadMoreGames,
  loadingButton,
  loading,
  orderBy,
} from '../gamesSlice';

let searchPage = 1;

const nextPage = (isInitial = false) => {
  if (isInitial) return (searchPage = 1);
  else return searchPage++;
};

// Action Creator
export const loadGames = (page) => async (dispatch) => {
  // Fetch using axios
  const gamesData = await axios(gamesListURL(page));

  dispatch(
    replaceGames({
      games: gamesData.data.results,
    })
  );
};

export const getSearchGames = (searchQuery) => async (dispatch) => {
  nextPage(true);
  dispatch(loading());
  const searchResults = await axios(
    `${searchGameURL(searchPage, searchQuery)}`
  );

  dispatch(
    searchGames({ searchResults: searchResults.data.results, searchQuery })
  );
};

export const getMoreGames =
  (page, searchQuery = '') =>
  async (dispatch) => {
    nextPage();
    dispatch(loadingButton());
    let moreGamesResults;
    let isEnding = false;

    if (!searchQuery) moreGamesResults = await axios(gamesListURL(page));
    else moreGamesResults = await axios(searchGameURL(searchPage, searchQuery));

    if (!moreGamesResults.data.next) {
      isEnding = true;
      dispatch(loadMoreGames({ moreGames: [], isEnding }));
      return;
    }

    dispatch(
      loadMoreGames({ moreGames: moreGamesResults.data.results, isEnding })
    );
  };

export const getOrderBy = (value) => async (dispatch) => {
  dispatch(loading());
  const newList = await axios(orderByURL(value));
  dispatch(orderBy({ games: newList.data.results }));
};
