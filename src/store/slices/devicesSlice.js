/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDevicesService, setStateService } from 'services/devices';

export const getDevicesAction = createAsyncThunk('common/getDevices', async (search) => {
  const response = await getDevicesService(search);
  return response;
});

export const setStateAction = createAsyncThunk('common/setState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getDevicesAction());
  return response;
});

const slice = createSlice({
  name: 'devices',
  initialState: { loading: false, devices: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setStateAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(setStateAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setStateAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDevicesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDevicesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload.result;
      })
      .addCase(getDevicesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getDevices = (state) => state.devicesSlice.devices;
export const getLoading = (state) => state.devicesSlice.loading;

export default slice.reducer;
