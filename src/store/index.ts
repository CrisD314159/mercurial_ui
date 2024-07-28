import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice'; // Importa AuthState

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define el RootState explícitamente
export type RootState = {
  auth: AuthState;
};

// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch;

export default store;