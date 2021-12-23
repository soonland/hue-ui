/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDevicesService, setStateService } from 'services/devices';

export const getDevicesAction = createAsyncThunk('common/getDevices', async (search) => {
  const response = await getDevicesService(search);
  return response;
});

export const setDevicesStateAction = createAsyncThunk('common/setDevicesState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getDevicesAction());
  return response;
});

const slice = createSlice({
  name: 'devices',
  initialState: { loadingCategories: false, loading: false, products: [], categories: [] },
  reducers: {},
  extraReducers: {
    [getDevicesAction.pending]: (state) => {
      state.loadingDevices = true;
    },
    [getDevicesAction.fulfilled]: (state, action) => {
      state.loadingDevices = false;
      state.devices = action.payload.result;
    },
    [getDevicesAction.rejected]: (state, action) => {
      state.loadingDevices = false;
      state.error = action.error.message;
    },
  },
});

export const getDevices = (state) => state.devicesSlice.devices;
export const getLoading = (state) => state.devicesSlice.loadingDevices;

export default slice.reducer;
