import { combineReducers } from 'redux';
import commonSlice from './slices/commonSlice';
import headerSlice from './slices/headerSlice';
import lightsSlice from './slices/lightsSlice';
import roomsSlice from './slices/roomsSlice';
import zonesSlice from './slices/zonesSlice';
import devicesSlice from './slices/devicesSlice';

export default combineReducers({
  commonSlice,
  headerSlice,
  lightsSlice,
  roomsSlice,
  zonesSlice,
  devicesSlice,
});
