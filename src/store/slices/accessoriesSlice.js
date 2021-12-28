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
  initialState: { loadingCategories: false, loading: false, products: [], categories: [] },
  reducers: {},
  extraReducers: {
    [getAccessoriesAction.pending]: (state) => {
      state.loadingAccessories = true;
    },
    [getAccessoriesAction.fulfilled]: (state, action) => {
      state.loadingAccessories = false;
      state.accessories = action.payload.result;
    },
    [getAccessoriesAction.rejected]: (state, action) => {
      state.loadingAccessories = false;
      state.error = action.error.message;
    },
  },
});

export const getAccessories = (state) => state.accessoriesSlice.accessories;
export const getLoading = (state) => state.accessoriesSlice.loadingAccessories;

export default slice.reducer;
