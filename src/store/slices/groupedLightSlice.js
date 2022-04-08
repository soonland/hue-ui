/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGroupedLightService, setStateService } from 'services/groupedLight';

export const getGroupedLightAction = createAsyncThunk('common/getGroupedLight', async (search) => {
  const response = await getGroupedLightService(search);
  return response;
});

export const setGroupedLightStateAction = createAsyncThunk('common/setState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getGroupedLightAction());
  return response;
});

const slice = createSlice({
  name: 'groupedLight',
  initialState: { loading: false, groupedLight: null },
  reducers: {},
  extraReducers: {
    // getProducts
    [getGroupedLightAction.pending]: (state) => {
      state.loading = true;
    },
    [getGroupedLightAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.groupedLight = action.payload.result;
    },
    [getGroupedLightAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getGroupedLight = (state) => state.groupedLightSlice.groupedLight;
export const getLoading = (state) => state.groupedLightSlice.loading;

export default slice.reducer;
