// /* eslint no-param-reassign: ["error", { "props": false }] */
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   getOrderService,
//   editOrderService,
//   addContactService,
//   editContactService,
//   deleteContactService,
//   addCommentService,
//   addRelatedOrderService,
//   editRelatedOrderService,
//   deleteRelatedOrderService,
//   addResponseReasonService,
//   editResponseReasonService,
//   deleteResponseReasonService,
// } from 'services/orderServices';
// import { clearAcceptOrderAction } from 'store/slices/taskFlow/acceptOrderSlice';

// /**
//  * @param action the redux action.
//  * @param ThunkAPI you can use thunkAPI in case you need to handle the redux execution flow.
//  * ThunkAPI provides the state, requestId, dispatch, cancellation, signals, etc.
//  */
// export const getOrderAction = createAsyncThunk('order/getOrderAction', async (id, thunkAPI) => {
//   const data = await getOrderService(id);
//   thunkAPI.dispatch(clearAcceptOrderAction());
//   return { data };
// });

// export const editOrderAction = createAsyncThunk('order/editOrderAction', async editData => {
//   const data = await editOrderService(editData);
//   return { data };
// });

// export const addOrderContactAction = createAsyncThunk('order/addOrderContactAction', async contactData => {
//   const data = await addContactService(contactData);
//   return { data };
// });

// export const editOrderContactAction = createAsyncThunk('order/editOrderContactAction', async contactData => {
//   const data = await editContactService(contactData);
//   return { data };
// });

// export const deleteOrderContactAction = createAsyncThunk('order/deleteOrderContactAction', async contactData => {
//   const data = await deleteContactService(contactData);
//   return { data };
// });

// export const addOrderCommentAction = createAsyncThunk('order/addOrderCommentAction', async contactData => {
//   const data = await addCommentService(contactData);
//   return { data };
// });

// export const addRelatedOrderAction = createAsyncThunk('order/addRelatedOrderAction', async relatedOrderData => {
//   const data = await addRelatedOrderService(relatedOrderData);
//   return { data };
// });

// export const editRelatedOrderAction = createAsyncThunk('order/editRelatedOrderAction', async relatedOrderData => {
//   const data = await editRelatedOrderService(relatedOrderData);
//   return { data };
// });

// export const deleteRelatedOrderAction = createAsyncThunk('order/deleteRelatedOrderAction', async relatedOrderData => {
//   const data = await deleteRelatedOrderService(relatedOrderData);
//   return { data };
// });

// export const addResponseReasonAction = createAsyncThunk('order/addResponseReasonAction', async responseData => {
//   const data = await addResponseReasonService(responseData);
//   return { data };
// });

// export const editResponseReasonAction = createAsyncThunk('order/editResponseReasonAction', async responseData => {
//   const data = await editResponseReasonService(responseData);
//   return { data };
// });

// export const deleteResponseReasonAction = createAsyncThunk('order/deleteResponseReasonAction', async responseData => {
//   const data = await deleteResponseReasonService(responseData);
//   return { data };
// });

// const initialState = {
//   order: {},
//   contacts: [],
//   diaryComments: [],
//   orderHistory: [],
//   error: '',
//   loading: false,
//   relatedOrders: [],
//   responseReasons: [],
//   rejectionReasons: [],
//   milestoneStatusData: [],
//   groupTaskStatusData: [],
//   taskStatusData: [],
// };

// export const slice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     // standard reducer logic
//   },
//   extraReducers: builder =>
//     // Add reducers that requires additional steps (pending, fulfilled, rejected, etc).
//     // Also, add reducers imported from other slices.
//     builder
//       // order actions
//       .addCase(getOrderAction.pending, state => {
//         state.order = {};
//         state.contacts = [];
//         state.diaryComments = [];
//         state.orderHistory = [];
//         state.relatedOrders = [];
//         state.responseReasons = [];
//         state.milestoneStatusData = [];
//         state.groupTaskStatusData = [];
//         state.taskStatusData = [];
//         state.acceptOrder = '';
//       })
//       .addCase(getOrderAction.fulfilled, (state, action) => {
//         state.order = action.payload.data.result.order;
//         state.contacts = action.payload.data.result.contacts;
//         state.diaryComments = action.payload.data.result.comments;
//         state.orderHistory = action.payload.data.result.orderHistory;
//         state.relatedOrders = action.payload.data.result.relatedOrders;
//         state.responseReasons = action.payload.data.result.responseReasons;
//         state.rejectionReasons = action.payload.data.result.rejectionReasons;
//         state.milestoneStatusData = action.payload.data.result.milestoneStatusData;
//         state.groupTaskStatusData = action.payload.data.result.groupTaskStatusData;
//         state.taskStatusData = action.payload.data.result.taskStatusData;
//       })
//       .addCase(getOrderAction.rejected, state => {
//         state.order = {};
//         state.contacts = [];
//         state.diaryComments = [];
//         state.orderHistory = [];
//         state.relatedOrders = [];
//         state.responseReasons = [];
//         state.milestoneStatusData = [];
//         state.groupTaskStatusData = [];
//         state.taskStatusData = [];
//         state.acceptOrder = '';
//       })
//       .addCase(editOrderAction.fulfilled, (state, action) => {
//         state.order = {
//           ...state.order,
//           [action.payload.data.result.columnName]: action.payload.data.result[action.payload.data.result.fieldName],
//         };
//       })

//       // contact info
//       .addCase(addOrderContactAction.fulfilled, (state, action) => {
//         state.contacts = [...state.contacts, action.payload.data.result];
//       })
//       .addCase(editOrderContactAction.fulfilled, (state, action) => {
//         state.contacts = [
//           ...state.contacts.slice(0, action.payload.data.result.contactIndex),
//           {
//             ...state.contacts[action.payload.data.result.contactIndex],
//             ...action.payload.data.result,
//           },
//           ...state.contacts.slice(action.payload.data.result.contactIndex + 1),
//         ];
//       })
//       .addCase(deleteOrderContactAction.fulfilled, (state, action) => {
//         state.contacts = [
//           ...state.contacts.slice(0, action.payload.data.result.contactIndex),
//           ...state.contacts.slice(action.payload.data.result.contactIndex + 1),
//         ];
//       })

//       // diary comments
//       .addCase(addOrderCommentAction.fulfilled, (state, action) => {
//         state.diaryComments = [action.payload.data.result, ...state.diaryComments];
//       })

//       // related orders
//       .addCase(addRelatedOrderAction.fulfilled, (state, action) => {
//         state.relatedOrders = [...state.relatedOrders, action.payload.data.result];
//       })
//       .addCase(editRelatedOrderAction.fulfilled, (state, action) => {
//         state.relatedOrders = [
//           ...state.relatedOrders.slice(0, action.payload.data.result.relatedOrderIndex),
//           {
//             ...state.relatedOrders[action.payload.data.result.relatedOrderIndex],
//             ...action.payload.data.result,
//           },
//           ...state.relatedOrders.slice(action.payload.data.result.relatedOrderIndex + 1),
//         ];
//       })
//       .addCase(deleteRelatedOrderAction.fulfilled, (state, action) => {
//         state.relatedOrders = [
//           ...state.relatedOrders.slice(0, action.payload.data.result.relatedOrderIndex),
//           ...state.relatedOrders.slice(action.payload.data.result.relatedOrderIndex + 1),
//         ];
//       })

//       // response reasons
//       .addCase(addResponseReasonAction.fulfilled, (state, action) => {
//         state.responseReasons = [...state.responseReasons, action.payload.data.result];
//       })
//       .addCase(editResponseReasonAction.fulfilled, (state, action) => {
//         state.responseReasons = [
//           ...state.responseReasons.slice(0, action.payload.data.result.responseReasonIndex),
//           {
//             ...state.responseReasons[action.payload.data.result.responseReasonIndex],
//             ...action.payload.data.result,
//           },
//           ...state.responseReasons.slice(action.payload.data.result.responseReasonIndex + 1),
//         ];
//       })
//       .addCase(deleteResponseReasonAction.fulfilled, (state, action) => {
//         state.responseReasons = [
//           ...state.responseReasons.slice(0, action.payload.data.result.responseReasonIndex),
//           ...state.responseReasons.slice(action.payload.data.result.responseReasonIndex + 1),
//         ];
//       })

//       // defaults for thunks
//       .addMatcher(
//         action => action.type.endsWith('pending'),
//         state => {
//           state.error = '';
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         action => action.type.endsWith('fulfilled'),
//         state => {
//           state.error = '';
//           state.loading = false;
//         }
//       )
//       .addMatcher(
//         action => action.type.endsWith('rejected'),
//         (state, action) => {
//           state.error = action.error;
//           state.loading = false;
//         }
//       ),
// });

// // selectors
// export const getOrder = state => state.orderSlice.order;
// export const getContacts = state => state.orderSlice.contacts;
// export const getDiaryComments = state => state.orderSlice.diaryComments;
// export const getOrderHistory = state => state.orderSlice.orderHistory;
// export const getRelatedOrders = state => state.orderSlice.relatedOrders;
// export const getResponseReasons = state => state.orderSlice.responseReasons;
// export const getRejectionReasons = state => state.orderSlice.rejectionReasons;
// export const getMilestoneStatusData = state => state.orderSlice.milestoneStatusData;
// export const getGroupTaskStatusData = state => state.orderSlice.groupTaskStatusData;
// export const getTaskStatusData = state => state.orderSlice.taskStatusData;
// export const getLoading = state => state.orderSlice.loading;
// export const getError = state => state.orderSlice.error;

// export default slice.reducer;
