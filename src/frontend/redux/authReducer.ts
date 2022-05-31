/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { authed: false, frontendVersion: '__COMMIT_ID__', backendVersion: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<{ authed: boolean; backendVersion: string }>) => {
      state.authed = action.payload.authed;
      state.backendVersion = action.payload.backendVersion;
    },
  },
});

export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;
