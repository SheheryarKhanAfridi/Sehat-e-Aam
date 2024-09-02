import { configureStore } from '@reduxjs/toolkit';
import { allAPis } from './api/apiServices';
import { adminApis } from './api/adminApis';
import { userReducer } from './reducers/userReducers';

export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
    [allAPis.reducerPath]: allAPis.reducer,
    [adminApis.reducerPath]: adminApis.reducer,
  },
  middleware: (mid) => [...mid(), adminApis.middleware, allAPis.middleware],
});
