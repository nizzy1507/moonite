// Animation
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import moonLogo from '../img/moon.svg';
import { getSearchGames } from '../store/actions/gamesAction';
import { clearSearch } from '../store/gamesSlice';
import { useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { fadeIn } from '../animation';

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;

  .search {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  input,
  button {
    font-family: inherit;
    font-size: 1.8rem;
  }

  input {
    width: 50%;
    padding: 1.5rem;
    border: none;
    outline: none;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    background-color: hsla(0, 0%, 100%, 0.16);
    border-radius: 1rem 0 0 1rem;
    color: white;
  }

  button {
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background-color: #ff7676;
    color: white;
    font-weight: bold;
    border-radius: 0 1rem 1rem 0;
  }

  @media screen and (max-width: 767px) {
    input {
      width: 100%;
    }
  } ;
`;

const spin = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  font-size: 2rem;
  letter-spacing: 1px;

  img {
    height: 4rem;
    width: 4rem;
    fill: white;
    margin-right: 1rem;
    filter: invert(0.1);
    animation: ${spin} 4s linear infinite;
  }
`;

const Nav = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef();

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(getSearchGames(searchInput));
    inputRef.current.blur();
  };

  const handleClearSearch = () => {
    setSearchInput('');
    dispatch(clearSearch());
  };

  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={handleClearSearch}>
        <img src={moonLogo} alt="Logo" />
        <h1>Moonite</h1>
      </Logo>
      <form className="search" onSubmit={handleSubmitSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={handleInput}
          ref={inputRef}
          placeholder="Search over 500,000+ games"
          required
        />
        <button type="submit">Search</button>
      </form>
    </StyledNav>
  );
};

export default Nav;
