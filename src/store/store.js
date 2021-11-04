import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const middleware = [...getDefaultMiddleware()];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default configureStore({
  reducer: reducers,
  middleware: [...middleware],
  initialState: {},
  enhancers: [],
});
