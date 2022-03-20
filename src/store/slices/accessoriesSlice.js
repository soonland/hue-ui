/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessoriesService, setStateService } from 'services/accessories';

export const getAccessoriesAction = createAsyncThunk('common/getAccessories', async (search) => {
  const response = await getAccessoriesService(search);
  return response;
});

export const setAccessoriesStateAction = createAsyncThunk('common/setAccessoriesState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getAccessoriesAction());
  return response;
});

const slice = createSlice({
  name: 'accessories',
  initialState: { loading: false, accessories: null },
  reducers: {},
  extraReducers: {
    [getAccessoriesAction.pending]: (state) => {
      state.loading = true;
    },
    [getAccessoriesAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.accessories = action.payload.result;
    },
    [getAccessoriesAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getAccessories = (state) => state.accessoriesSlice.accessories;
export const getLoading = (state) => state.accessoriesSlice.loading;

export default slice.reducer;
