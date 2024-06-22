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
  initialState: { loading: false, zones: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteZoneAction.pending, (state) => {
      state.loading = true;
    })
      .addCase(deleteZoneAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteZoneAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setZoneStateAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(setZoneStateAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setZoneStateAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(getZonesAction.pending, (state) => {
        state.loading = true;
      }).addCase(getZonesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.zones = action.payload.result;
      }).addCase(getZonesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getZones = (state) => state.zonesSlice.zones;
export const getLoading = (state) => state.zonesSlice.loading;

export default slice.reducer;
