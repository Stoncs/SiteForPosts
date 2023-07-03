import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
