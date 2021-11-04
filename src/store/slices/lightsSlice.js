/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLightsService, setStateService } from 'services/lights';

export const getLightsAction = createAsyncThunk('common/getLights', async (search) => {
  const response = await getLightsService(search);
  return response;
});

export const setStateAction = createAsyncThunk('common/setState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getLightsAction());
  return response;
});

const slice = createSlice({
  name: 'lights',
  initialState: { loadingCategories: false, loading: false, products: [], categories: [] },
  reducers: {},
  extraReducers: {
    // getProducts
    [getLightsAction.pending]: (state) => {
      state.loading = true;
    },
    [getLightsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.lights = action.payload.result;
    },
    [getLightsAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getLights = (state) => state.lightsSlice.lights;
export const getLoading = (state) => state.lightsSlice.loading;

export default slice.reducer;
