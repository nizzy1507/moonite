import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGames, getMoreGames } from '../store/actions/gamesAction';

// Components
import Game from '../components/Game';

// Styling
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GameDetail from '../components/GameDetail';
import { Route } from 'react-router-dom';
import loadingIcon from '../img/loading.svg';

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;

  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 599px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled.div`
  padding: 5rem 0;
  text-align: center;

  button {
    display: inline-block;
    cursor: pointer;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 1rem;
    color: white;
    width: 20rem;
    height: 6.4rem;
    font-size: 1.8rem;
  }

  button:disabled {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: transparent;
    cursor: not-allowed;
  }

  button img {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin-bottom: 2rem;
  }

  select {
    padding: 1rem;
    border-radius: 4px;
    font-family: inherit;
    outline: none;
    border: none;
  }
`;

const Loading = styled.div`
  margin-top: 5rem;
  img {
    width: 10rem;
    height: 10rem;
    margin: 0 auto;
  }
`;

const Home = () => {
  //Get current location
  const {
    games,
    searched,
    page,
    buttonLoading,
    searchQuery,
    loading,
    isEnding,
  } = useSelector((state) => state.games);
  // const selectRef = useRef();

  //Fetch games
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames(1));
  }, [dispatch]);

  if (loading) {
    return (
      <Loading>
        <img src={loadingIcon} alt="Loading Circle" />
      </Loading>
    );
  }

  const handleLoadMore = () => {
    dispatch(getMoreGames(page, searchQuery));
  };

  // const handleOrderBy = () => {
  //   dispatch(getOrderBy(selectRef.current.value));
  // };

  return (
    <>
      <Route path="/games/:id">
        <GameDetail />
      </Route>

      {searched.length > 0 && (
        <div className="searched">
          <TitleContainer>
            <h2>Searched Results</h2>
          </TitleContainer>
          <Games>
            {searched.map((game) => (
              <Game
                key={game.id}
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
              />
            ))}
          </Games>
        </div>
      )}

      {searched.length === 0 && (
        <>
          <TitleContainer>
            <h2>Explore Games</h2>
            {/* <div>
              <label>Order by: </label>
              <select ref={selectRef} onChange={handleOrderBy}>
                <option value="">Relevance</option>
                <option value="name">Name</option>
                <option value="-added">Date added</option>
                <option value="-rating">Popularity</option>
                <option value="-released">Release date</option>
              </select>
            </div> */}
          </TitleContainer>
          <Games>
            {games.map((game) => (
              <Game
                key={game.id}
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.background_image}
              />
            ))}
          </Games>
        </>
      )}
      <ButtonContainer>
        {isEnding ? (
          <p>End of results</p>
        ) : (
          <button onClick={handleLoadMore} disabled={buttonLoading}>
            {buttonLoading ? (
              <img src={loadingIcon} alt="Loading Icon" />
            ) : (
              'Load More'
            )}
          </button>
        )}
      </ButtonContainer>
    </>
  );
};

export default Home;
