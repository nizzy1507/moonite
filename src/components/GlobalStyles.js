import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-title: #fff;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    font-size: 62.5%;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 400;
    background-color: #151515;
    color: white;
  }

  img {
    display: block;
    width: 100%;
  }

  h2 {
    font-size: 5rem;
    font-family: 'Odibee Sans', cursive;
    font-weight: lighter;
    color: var(--color-title);
    letter-spacing: 2px;
  }

  h3 {
    font-size: 2rem;
    color: var(--color-title);
  }

  p {
    color: rgba(245,245,245,0.6);
  }

  a {
    text-decoration: none;
    color: var(--color-title);
  }
`;

export default GlobalStyles;
