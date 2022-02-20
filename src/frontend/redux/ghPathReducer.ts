/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFile from '../../types/IFile';
import ISettings from '../../types/ISettings';
import ls from '../service/ls';

const initialState: { path: string; files: IFile[]; loading: boolean } = {
  path: '',
  files: [],
  loading: false,
};

export const refreshFiles = createAsyncThunk(
  'ghPath/refreshFiles',
  async (path: string, thunkApi) => {
    const config = (thunkApi.getState() as { settings: { settings: ISettings } }).settings.settings;
    const res = await ls({ owner: config.owner, repo: config.repo, path });
    if (res) return { res, path };
    return { res: [], path };
  },
);

const ghPathSlice = createSlice({
  name: 'ghPath',
  initialState,
  reducers: {
    changePath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
    changeFiles: (state, action: PayloadAction<IFile[]>) => {
      state.files = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshFiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshFiles.fulfilled, (state, action) => {
      state.files = action.payload.res;
      state.path = action.payload.path;
      state.loading = false;
    });
  },
});

export const { changePath, changeFiles, changeLoading } = ghPathSlice.actions;

export default ghPathSlice.reducer;
