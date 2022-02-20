/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { authed: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.authed = action.payload;
    },
  },
});

export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;
