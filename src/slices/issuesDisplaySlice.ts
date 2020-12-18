import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Repo = { org: string; repo: string };
type Page = { page: number };
type DisplayState = Repo & Page;

const initialState: DisplayState = {
  org: 'reduxjs',
  repo: 'redux',
  page: 1,
};

const issuesDisplaySlice = createSlice({
  name: 'issuesDisplay',
  initialState,
  reducers: {
    displayRepo(state, action: PayloadAction<Repo>) {
      const { org, repo } = action.payload;
      state.org = org;
      state.repo = repo;
    },
    setCurrentPage(state, action: PayloadAction<Page>) {
      const { page } = action.payload;
      state.page = page;
    },
  },
});

export const { displayRepo, setCurrentPage } = issuesDisplaySlice.actions;
export default issuesDisplaySlice.reducer;
