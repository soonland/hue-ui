/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getZonesService, deleteService, setStateService } from 'services/zones';

export const getZonesAction = createAsyncThunk('common/getZones', async (search) => {
  const response = await getZonesService(search);
  return response;
});

export const deleteZoneAction = createAsyncThunk('common/deleteZone', async (data, thunkApi) => {
  const response = await deleteService(data.id);
  thunkApi.dispatch(getZonesAction());
  return response;
});

export const setZoneStateAction = createAsyncThunk('common/setZoneState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getZonesAction());
  return response;
});

const slice = createSlice({
  name: 'zones',
  initialState: { loadingCategories: false, loading: false, products: [], categories: [] },
  reducers: {},
  extraReducers: {
    [getZonesAction.pending]: (state) => {
      state.loadingZone = true;
    },
    [getZonesAction.fulfilled]: (state, action) => {
      state.loadingZone = false;
      state.zones = action.payload.result;
    },
    [getZonesAction.rejected]: (state, action) => {
      state.loadingZone = false;
      state.error = action.error.message;
    },
  },
});

export const getZones = (state) => state.zonesSlice.zones;
export const getLoading = (state) => state.zonesSlice.loadingZone;

export default slice.reducer;
