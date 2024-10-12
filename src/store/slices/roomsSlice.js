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
  extraReducers: (builder) => {
    builder
      .addCase(deleteRoomAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRoomAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRoomAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setRoomStateAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(setRoomStateAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setRoomStateAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRoomAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoomAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRoomAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRoomsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.result;
      })
      .addCase(getRoomsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getRooms = (state) => state.roomsSlice.rooms;
export const getLoading = (state) => state.roomsSlice.loading;

export default slice.reducer;
