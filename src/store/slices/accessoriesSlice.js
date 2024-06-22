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
  extraReducers: (builder) => {
    builder.addCase(setAccessoriesStateAction.pending, (state) => {
      state.loading = true;
    })
      .addCase(setAccessoriesStateAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setAccessoriesStateAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }).addCase(getAccessoriesAction.pending, (state) => {
        state.loading = true;
      }).addCase(getAccessoriesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = action.payload.result;
      }).addCase(getAccessoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getAccessories = (state) => state.accessoriesSlice.accessories;
export const getLoading = (state) => state.accessoriesSlice.loading;

export default slice.reducer;
