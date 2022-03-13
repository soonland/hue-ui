import { combineReducers } from 'redux';
import bridgesSlice from './slices/bridgesSlice';
import headerSlice from './slices/headerSlice';
import lightsSlice from './slices/lightsSlice';
import roomsSlice from './slices/roomsSlice';
import zonesSlice from './slices/zonesSlice';
import accessoriesSlice from './slices/accessoriesSlice';

export default combineReducers({
  bridgesSlice,
  headerSlice,
  lightsSlice,
  roomsSlice,
  zonesSlice,
  accessoriesSlice,
});
