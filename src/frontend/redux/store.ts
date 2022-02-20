import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authReducer';
import ghPathReducer from './ghPathReducer';
import settingsReducer from './settingsReducer';

const store = configureStore({
  reducer: { ghPath: ghPathReducer, settings: settingsReducer, auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
