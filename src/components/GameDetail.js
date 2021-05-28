import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadDetail } from '../store/actions/detailAction';
import { resetDetail } from '../store/detailSlice';
import { useHistory, useParams } from 'react-router';
import { resizeImage } from '../util';

// Style Components
import {
  CardShadow,
  Detail,
  Info,
  Stats,
  Platforms,
  Media,
  Description,
  Gallery,
  Stores,
} from './gameDetailStyle';

// Images
import playstation from '../img/playstation.svg';
import windows from '../img/windows.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
import linux from '../img/linux.svg';
import android from '../img/android.svg';

const GameDetail = () => {
  const { detail, screenshots, isLoading } = useSelector(
    (state) => state.detail
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const getPlatform = (platform) => {
    switch (platform) {
      case 'PlayStation':
        return playstation;
      case 'Xbox':
        return xbox;
      case 'PC':
        return windows;
      case 'Nintendo':
        return nintendo;
      case 'Apple Macintosh':
      case 'iOS':
        return apple;
      case 'Linux':
        return linux;
      case 'Android':
        return android;
      default:
        return gamepad;
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    dispatch(loadDetail(id));

    return () => dispatch(resetDetail());
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <CardShadow>
        <Detail layoutId={id}>
          <h2>Loading...</h2>
        </Detail>
      </CardShadow>
    );
  }

  const handleCloseCard = (e) => {
    if (e.target.classList.contains('shadow')) {
      document.body.style.overflow = 'auto';
      history.goBack('/');
    }
  };

  const metaScore = (score) => {
    if (score > 80) return 'high';
    if (score < 80 && score > 60) return 'medium';
    if (score < 60) return 'low';
  };

  return (
    <CardShadow className="shadow" onClick={handleCloseCard}>
      <Detail layoutId={id}>
        <Stats>
          <div className="rating">
            <h3 className="title">
              {detail.name}
              {detail.metacritic && (
                <span
                  title="Metascore"
                  className={metaScore(detail.metacritic)}
                >
                  {detail.metacritic}
                </span>
              )}
            </h3>
            <p>
              Rating: <span className="rating-value">{detail.rating}</span> / 5
            </p>
          </div>
          <Info>
            <h3>Platforms</h3>
            <Platforms>
              {detail.parent_platforms.map(({ platform }) => (
                <img
                  key={platform.id}
                  src={getPlatform(platform.name)}
                  alt={platform.name}
                />
              ))}
            </Platforms>
          </Info>
        </Stats>
        <Media>
          <div className="image-container">
            <img
              className="game-image"
              src={resizeImage(detail.background_image, 1280)}
              alt={detail.name}
            />
          </div>
          <Description>
            {detail.description_raw && (
              <p>
                <span>About:</span> {detail.description_raw}
              </p>
            )}
            {detail.genres && (
              <p>
                <span>Genre:</span>{' '}
                {detail.genres.map((genre) => genre.name).join(', ')}
              </p>
            )}
            {detail.developers && (
              <p>
                <span>Developer:</span> {detail.developers[0].name}
              </p>
            )}
            {detail.publishers && (
              <p>
                <span>Publisher:</span> {detail.publishers[0].name}
              </p>
            )}
            {detail.platforms && (
              <p>
                <span>Platforms:</span>{' '}
                {detail.platforms
                  .map(({ platform }) => platform.name)
                  .join(', ')}
              </p>
            )}
            {detail.esrb_rating && (
              <p>
                <span>Age rating:</span> {detail.esrb_rating.name}
              </p>
            )}
            {detail.tags && (
              <p>
                <span>Tags:</span>{' '}
                {detail.tags.map((tag) => tag.name).join(', ')}
              </p>
            )}
          </Description>
          <Stores>
            <p>You can visit these stores to buy the game: </p>
            <ul>
              {detail.stores.map(({ id, store }) => (
                <li key={id}>
                  <a
                    href={`https://${store.domain}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {store.name}
                  </a>
                </li>
              ))}
            </ul>
          </Stores>
          <Gallery>
            {screenshots.results?.map((src, index) => (
              <img
                className="game-image"
                src={resizeImage(src.image, 1280)}
                alt={`Screenshot #${index} of ${detail.name}`}
                key={src.id}
              />
            ))}
          </Gallery>
        </Media>
      </Detail>
    </CardShadow>
  );
};

export default GameDetail;
