import { combineReducers } from 'redux';
import buildingsReducer from './buildingsReducer';

export default combineReducers({
  buildings: buildingsReducer
});