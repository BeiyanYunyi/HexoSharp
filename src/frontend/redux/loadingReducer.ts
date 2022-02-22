/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  /** Differs to `loaded` in `settingsReducer`,
   * it will not block the render of other components. */
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { changeLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
