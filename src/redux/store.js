import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { petsReducer } from './slices/pets';

const store = configureStore({
  reducer: {
    pets: petsReducer,
    auth: authReducer,
  },
});

export { store };
