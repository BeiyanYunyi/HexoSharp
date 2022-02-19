/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../types/GetRepoContentData';
import ls from '../service/ls';

const initialState: { path: string; files: IFile[]; loading: boolean } = {
  path: '',
  files: [],
  loading: false,
};

export const refreshFiles = createAsyncThunk('ghPath/refreshFiles', async (path: string) => {
  const res = await ls({ owner: 'lixiang810', repo: 'HexoSharp', path });
  return { res: res.data, path };
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
      if (Array.isArray(action.payload.res)) {
        state.files = action.payload.res;
        state.path = action.payload.path;
        state.loading = false;
      } else {
        console.log(action.payload);
      }
    });
  },
});

export const { changePath, changeFiles, changeLoading } = ghPathSlice.actions;

export default ghPathSlice.reducer;
