/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBridgesService, getSearchNewLightsService, getNewLightsService } from 'services/bridges';

export const getBridgesAction = createAsyncThunk('common/getBridges', async (search) => {
  const response = await getBridgesService(search);
  return response;
});

export const getSearchNewLightsAction = createAsyncThunk('common/getSearchNewLights', async (search) => {
  const response = await getSearchNewLightsService(search);
  return response;
});

export const getNewLightsAction = createAsyncThunk('common/getNewLights', async (search) => {
  const response = await getNewLightsService(search);
  return response;
});

const slice = createSlice({
  name: 'bridges',
  initialState: {
    loadingBridges: false,
    bridges: [],
    errorBridges: '',
    loadingSearchLight: false,
    searchNewLights: [],
    errorSearchNewLights: '',
    loadingNewLight: false,
    newLights: null,
    errorNewLights: '',
  },
  reducers: {},
  extraReducers: {
    [getBridgesAction.pending]: (state) => {
      state.loadingBridges = true;
    },
    [getBridgesAction.fulfilled]: (state, action) => {
      state.loadingBridges = false;
      state.bridges = action.payload.result;
    },
    [getBridgesAction.rejected]: (state, action) => {
      state.loadingBridges = false;
      state.errorBridges = action.error.message;
    },
    [getSearchNewLightsAction.pending]: (state) => {
      state.loadingSearchLight = true;
    },
    [getSearchNewLightsAction.fulfilled]: (state, action) => {
      state.loadingSearchLight = false;
      state.loadingNewLight = true;
      state.searchNewLights = action.payload.result;
    },
    [getSearchNewLightsAction.rejected]: (state, action) => {
      state.loadingSearchLight = false;
      state.errorSearchNewLights = action.error.message;
    },
    [getNewLightsAction.pending]: (state) => {
      state.loadingNewLight = true;
    },
    [getNewLightsAction.fulfilled]: (state, action) => {
      state.loadingNewLight = false;
      state.newLights = action.payload.result;
    },
    [getNewLightsAction.rejected]: (state, action) => {
      state.loadingNewLight = false;
      state.errorNewLights = action.error.message;
    },
  },
});

export const getBridges = (state) => state.bridgesSlice.bridges;
export const getNewLights = (state) => state.bridgesSlice.newLights;
export const getSearchNewLights = (state) => state.bridgesSlice.searchNewLights;
export const getLoadingBridges = (state) => state.bridgesSlice.loadingBridges;
export const getLoadingSearchLight = (state) => state.bridgesSlice.loadingSearchLight;
export const getLoadingNewLight = (state) => state.bridgesSlice.loadingNewLight;

export default slice.reducer;
