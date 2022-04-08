import { combineReducers } from 'redux';
import bridgesSlice from './slices/bridgesSlice';
import headerSlice from './slices/headerSlice';
import lightsSlice from './slices/lightsSlice';
import devicesSlice from './slices/devicesSlice';
import groupedLightSlice from './slices/groupedLightSlice';
import roomsSlice from './slices/roomsSlice';
import zonesSlice from './slices/zonesSlice';
import accessoriesSlice from './slices/accessoriesSlice';

export default combineReducers({
  bridgesSlice,
  headerSlice,
  devicesSlice,
  lightsSlice,
  groupedLightSlice,
  roomsSlice,
  zonesSlice,
  accessoriesSlice,
});
