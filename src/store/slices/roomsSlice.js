/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoomsService, deleteService, setStateService } from 'services/rooms';

export const getRoomsAction = createAsyncThunk('common/getRooms', async (search) => {
  const response = await getRoomsService(search);
  return response;
});

export const deleteRoomAction = createAsyncThunk('common/deleteRoom', async (data, thunkApi) => {
  const response = await deleteService(data.id);
  thunkApi.dispatch(getRoomsAction());
  return response;
});

export const setRoomStateAction = createAsyncThunk('common/setRoomState', async (data, thunkApi) => {
  const response = await setStateService(data);
  thunkApi.dispatch(getRoomsAction());
  return response;
});

const slice = createSlice({
  name: 'rooms',
  initialState: { loadingCategories: false, loading: false, products: [], categories: [] },
  reducers: {},
  extraReducers: {
    [getRoomsAction.pending]: (state) => {
      state.loadingRoom = true;
    },
    [getRoomsAction.fulfilled]: (state, action) => {
      state.loadingRoom = false;
      state.rooms = action.payload.result;
    },
    [getRoomsAction.rejected]: (state, action) => {
      state.loadingRoom = false;
      state.error = action.error.message;
    },
  },
});

export const getRooms = (state) => state.roomsSlice.rooms;
export const getLoading = (state) => state.roomsSlice.loadingRoom;

export default slice.reducer;
