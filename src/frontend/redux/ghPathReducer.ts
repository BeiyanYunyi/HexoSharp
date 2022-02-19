/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFile from '../../types/IFile';
import ls from '../service/ls';

const initialState: { path: string; files: IFile[]; loading: boolean } = {
  path: '',
  files: [],
  loading: false,
};

export const refreshFiles = createAsyncThunk('ghPath/refreshFiles', async (path: string) => {
  const res = await ls({ owner: 'lixiang810', repo: 'HexoSharp', path });
  if (res) return { res, path };
  return { res: [], path };
});

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
