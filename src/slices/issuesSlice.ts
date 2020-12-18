import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIssue, getAllIssue, Issue, IssuesResult } from 'api/githubAPI';
import { AppThunk } from 'store';
import { Links } from 'parse-link-header';

type IssuesState = {
  issuesByNumber: Record<number, Issue>;
  pageIssues: number[];
  totalPages: number;
  pageLinks: Links | null;
  isLoading: boolean;
  error: string | null;
};

const issuesInitialState: IssuesState = {
  issuesByNumber: {},
  pageIssues: [],
  totalPages: 0,
  pageLinks: {},
  isLoading: false,
  error: null,
};

const issues = createSlice({
  name: 'issues',
  initialState: issuesInitialState,
  reducers: {
    getIssueStart(state) {
      state.isLoading = true;
    },
    getIssueSuccess(state, action: PayloadAction<Issue>) {
      const { number } = action.payload;
      state.issuesByNumber[number] = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getIssueFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllIssueStart(state) {
      state.isLoading = true;
    },
    getAllIssueSuccess(state, action: PayloadAction<IssuesResult>) {
      const { pageCount, issues, pageLinks } = action.payload;
      state.totalPages = pageCount;
      state.pageLinks = pageLinks;
      state.isLoading = false;
      state.error = null;

      issues.forEach((issue) => {
        state.issuesByNumber[issue.number] = issue;
      });

      state.pageIssues = issues.map((issue) => issue.number);
    },
    getAllIssueFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

type FetchIssue = (org: string, repo: string, number: number) => AppThunk;
type FetchAllIssue = (org: string, repo: string, page?: number) => AppThunk;

const fetchIssue: FetchIssue = (org, repo, number) => async (dispatch) => {
  try {
    dispatch(getIssueStart());
    const issue = await getIssue(org, repo, number);
    dispatch(getIssueSuccess(issue));
  } catch (error) {
    dispatch(getIssueFailure(error.toString()));
  }
};

const fetchAllIssue: FetchAllIssue = (org, repo, page) => async (dispatch) => {
  try {
    dispatch(getAllIssueStart());
    const issues = await getAllIssue(org, repo, page);

    dispatch(getAllIssueSuccess(issues));
  } catch (error) {
    dispatch(getAllIssueFailure(error.toString()));
  }
};

export const {
  getIssueStart,
  getIssueSuccess,
  getIssueFailure,
  getAllIssueStart,
  getAllIssueSuccess,
  getAllIssueFailure,
} = issues.actions;

export { fetchAllIssue, fetchIssue };
export default issues.reducer;
