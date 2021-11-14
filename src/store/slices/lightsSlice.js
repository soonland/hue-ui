/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLightsService, setStateService, getGroupsService, deleteGroupService, setGroupStateService } from 'services/lights';

export const getLightsAction = createAsyncThunk('common/getLights', async (search) => {
  const response = await getLightsService(search);
  return response;
});

export const getGroupsAction = createAsyncThunk('common/getGroups', async (search) => {
  const response = await getGroupsService(search);
  return response;
});

export const deleteGroupAction = createAsyncThunk('common/deleteGroup', async (data, thunkApi) => {
  const response = await deleteGroupService(data.id);
  thunkApi.dispatch(getGroupsAction());
  return response;
});

export const setStateAction = createAsyncThunk('common/setState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getLightsAction());
  return response;
});

export const setGroupStateAction = createAsyncThunk('common/setGroupState', async (data, thunkApi) => {
  const response = await setGroupStateService(data);
  thunkApi.dispatch(getGroupsAction());
  return response;
});

const slice = createSlice({
  name: 'lights',
  initialState: { loadingCategories: false, loading: false, products: [], categories: [] },
  reducers: {},
  extraReducers: {
    // getProducts
    [getLightsAction.pending]: (state) => {
      state.loading = true;
    },
    [getLightsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.lights = action.payload.result;
    },
    [getLightsAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getGroupsAction.pending]: (state) => {
      state.loadingGroup = true;
    },
    [getGroupsAction.fulfilled]: (state, action) => {
      state.loadingGroup = false;
      state.groups = action.payload.result;
    },
    [getGroupsAction.rejected]: (state, action) => {
      state.loadingGroup = false;
      state.error = action.error.message;
    },
  },
});

export const getLights = (state) => state.lightsSlice.lights;
export const getGroups = (state) => state.lightsSlice.groups;
export const getLoading = (state) => state.lightsSlice.loading;
export const getLoadingGroup = (state) => state.lightsSlice.loadingGroup;

export default slice.reducer;
