import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { resizeImage } from '../util';
import { popup } from '../animation';

import imageNotFound from '../img/image-not-found.jpg';

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  background-color: #202020;
  cursor: pointer;

  .game-image {
    padding-top: 56.25%;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .game-info {
    padding: 2rem;

    h3 {
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
  }

  @media screen and (max-width: 1279px) {
    min-height: auto;
  }
`;

const Game = ({ name, released, image, id }) => {
  return (
    <StyledGame variants={popup} initial="hidden" animate="show">
      <Link to={`/games/${id}`}>
        <div className="game-image">
          <img
            src={image ? resizeImage(image, 640) : imageNotFound}
            alt={name}
            loading="lazy"
          />
        </div>
        <div className="game-info">
          <h3>{name}</h3>
          <p>Release date: {new Date(released).toDateString()}</p>
        </div>
      </Link>
    </StyledGame>
  );
};

export default Game;
