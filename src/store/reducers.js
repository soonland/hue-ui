import { combineReducers } from 'redux';
import commonSlice from './slices/commonSlice';
import headerSlice from './slices/headerSlice';
import lightsSlice from './slices/lightsSlice';
import roomsSlice from './slices/roomsSlice';

export default combineReducers({
  commonSlice,
  headerSlice,
  lightsSlice,
  roomsSlice,
});
