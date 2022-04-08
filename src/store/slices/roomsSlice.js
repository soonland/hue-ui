/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoomsService, deleteService, setStateService, updateRoomService } from 'services/rooms';

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

export const updateRoomAction = createAsyncThunk('common/updateRoomAction', async (data, thunkApi) => {
  const response = await updateRoomService(data);
  thunkApi.dispatch(getRoomsAction());
  return response;
});

const slice = createSlice({
  name: 'rooms',
  initialState: { loading: false, rooms: null },
  reducers: {},
  extraReducers: {
    [getRoomsAction.pending]: (state) => {
      state.loading = true;
    },
    [getRoomsAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.rooms = action.payload.result;
    },
    [getRoomsAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateRoomAction.pending]: (state) => {
      state.loading = true;
    },
    [updateRoomAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.updatedRoom = action.payload.result;
    },
    [updateRoomAction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const getRooms = (state) => state.roomsSlice.rooms;
export const getLoading = (state) => state.roomsSlice.loading;

export default slice.reducer;
