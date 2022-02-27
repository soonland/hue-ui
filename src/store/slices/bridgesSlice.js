/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBridgesService } from 'services/bridges';

export const getBridgesAction = createAsyncThunk('common/getBridges', async (search) => {
  const response = await getBridgesService(search);
  return response;
});

const slice = createSlice({
  name: 'bridges',
  initialState: { loading: false, bridges: null },
  reducers: {},
  extraReducers: {
    // getProducts
    [getBridgesAction.pending]: (state) => {
      state.loading = true;
    },
    [getBridgesAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.bridges = action.payload.result;
    },
    [getBridgesAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getBridges = (state) => state.bridgesSlice.bridges;
export const getLoading = (state) => state.bridgesSlice.loading;

export default slice.reducer;
