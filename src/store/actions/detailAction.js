import axios from 'axios';
import { gameDetailsURL, gameScreenshotURL } from '../../api';
import { getDetail } from '../detailSlice';

export const loadDetail = (id) => async (dispatch) => {
  // dispatch(loading());

  const { data: detail } = await axios(gameDetailsURL(id));
  const { data: screenshots } = await axios(gameScreenshotURL(id));

  dispatch(
    getDetail({
      detail,
      screenshots,
      isLoading: false,
    })
  );
};
