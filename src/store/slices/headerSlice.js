/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateWeatherService } from '../../services/weather';

export const updateWeatherAction = createAsyncThunk('common/updateWeather', async (search) => {
  const response = await updateWeatherService(search);
  return response;
});

const slice = createSlice({
  name: 'header',
  initialState: { lang: 'en' },
  reducers: {
    changeLang(state) {
      if (state.lang === 'en') state.lang = 'fr';
      else state.lang = 'en';
    },
  },
  extraReducers: {
    [updateWeatherAction.pending]: (state) => {
      state.loadingWeather = true;
    },
    [updateWeatherAction.fulfilled]: (state, action) => {
      state.loadingWeather = false;
      state.weather = action.payload.result;
    },
    [updateWeatherAction.rejected]: (state, action) => {
      state.loadingWeather = false;
      state.errorWeather = action.error.message;
    },
  }
});

export const { changeLang } = slice.actions;

export const getLang = (state) => state.headerSlice.lang;
export const getWeather = (state) => state.headerSlice.weather;

export default slice.reducer;
