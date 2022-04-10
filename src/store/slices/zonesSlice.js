/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getZonesService, deleteService, setStateService } from 'services/zones';
import { addNewZone } from '../../services/zones';

export const getZonesAction = createAsyncThunk('common/getZones', async (search) => {
  const response = await getZonesService(search);
  return response;
});

export const deleteZoneAction = createAsyncThunk('common/deleteZone', async (data, thunkApi) => {
  const response = await deleteService(data);
  thunkApi.dispatch(getZonesAction());
  return response;
});

export const setZoneStateAction = createAsyncThunk('common/setZoneState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getZonesAction());
  return response;
});

export const addNewZoneAction = createAsyncThunk('common/addNewZone', async (data, thunkApi) => {
  const response = await addNewZone(data);
  console.log('addNewZone :', response);
  // thunkApi.dispatch(getZonesAction());
  return response;
});

const slice = createSlice({
  name: 'zones',
  initialState: { loading: false, zones: null },
  reducers: {},
  extraReducers: {
    [getZonesAction.pending]: (state) => {
      state.loading = true;
    },
    [getZonesAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.zones = action.payload.result;
    },
    [getZonesAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addNewZoneAction.pending]: (state) => {
      state.loading = true;
    },
    [addNewZoneAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.zones = action.payload.result;
    },
    [addNewZoneAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getZones = (state) => state.zonesSlice.zones;
export const getLoading = (state) => state.zonesSlice.loading;

export default slice.reducer;
