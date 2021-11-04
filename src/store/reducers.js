import { combineReducers } from 'redux';
import commonSlice from './slices/commonSlice';
import headerSlice from './slices/headerSlice';
import lightsSlice from './slices/lightsSlice';

export default combineReducers({
  commonSlice,
  headerSlice,
  lightsSlice,
});
