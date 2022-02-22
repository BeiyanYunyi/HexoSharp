import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import settingsReducer from './settingsReducer';

const store = configureStore({
  reducer: { settings: settingsReducer, auth: authReducer, loading: loadingReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
