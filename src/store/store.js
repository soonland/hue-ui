import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middleware],
  initialState: {},
  enhancers: (defaultEnhancers) => defaultEnhancers(),
});
