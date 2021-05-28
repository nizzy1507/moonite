// Base URL
const API_KEY = '5c34871cd8d64ee985c11bb6b281f18c';
const BASE_URL = 'https://api.rawg.io/api';
const PAGE_SIZE = 10;

//Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  return `${month}`.padStart(2, 0);
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  return day;
};

// Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

// Popular games
const POPULAR_GAMES = `/games?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=${PAGE_SIZE}`;
const UPCOMING_GAMES = `/games?key=${API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=${PAGE_SIZE}`;
const NEW_GAMES = `/games?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-released&page_size=${PAGE_SIZE}`;

export const popularGamesURL = `${BASE_URL}${POPULAR_GAMES}`;
export const upcomingGamesURL = `${BASE_URL}${UPCOMING_GAMES}`;
export const newGamesURL = `${BASE_URL}${NEW_GAMES}`;

//Main list
export const gamesListURL = (page) =>
  `${BASE_URL}/games?ordering=-added&page=${page}&page_size=12&key=${API_KEY}`;

// Game detail
export const gameDetailsURL = (id) => `${BASE_URL}/games/${id}?key=${API_KEY}`;
// Game screenshots
export const gameScreenshotURL = (id) =>
  `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`;
// Searched game
export const searchGameURL = (page, searchQuery) =>
  `${BASE_URL}/games?search=${searchQuery}&page=${page}&page_size=12&key=${API_KEY}`;

// Order by
export const orderByURL = (value) =>
  `${BASE_URL}/games?ordering=${value}&page=${1}&page_size=12&key=${API_KEY}`;
