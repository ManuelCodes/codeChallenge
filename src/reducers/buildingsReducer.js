import {
    FETCH_BUILDINGS
} from '../constants/types';

export default  (state = { buildingList: { data: { items: [] } } }, action) => {

    switch(action.type) {
      case FETCH_BUILDINGS:
        return { ...state, 'buildingList': action.payload };
      default:
        return state;
    }
  }