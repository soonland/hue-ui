/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'header',
  initialState: { lang: 'en' },
  reducers: {
    changeLang(state) {
      if (state.lang === 'en') state.lang = 'fr';
      else state.lang = 'en';
    },
  },
});

export const { changeLang } = slice.actions;

export const getLang = (state) => state.headerSlice.lang;

export default slice.reducer;
