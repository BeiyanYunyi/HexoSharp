/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISettings from '../../types/ISettings';

const initialState: { settings: ISettings; loaded: boolean } = {
  settings: { ghApiToken: '' },
  loaded: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSetting: (state, action: PayloadAction<{ key: keyof ISettings; value: string }>) => {
      state.settings[action.payload.key] = action.payload.value;
    },
    changeSettings: (state, action: PayloadAction<ISettings>) => {
      state.settings = action.payload;
    },
    changeLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { changeSetting, changeSettings, changeLoaded } = settingsSlice.actions;

export default settingsSlice.reducer;
