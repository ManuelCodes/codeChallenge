import {
    FETCH_BUILDINGS
} from '../constants/types';
import blueRiver from '../apis/blueRiver';

export const fetchBuildings = () => async dispatch => {
    const response = await blueRiver.get();
    dispatch(
      {
        type: FETCH_BUILDINGS,
        payload: response.data
      }
    );
  };