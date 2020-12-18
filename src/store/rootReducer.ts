import { combineReducers } from '@reduxjs/toolkit';
import issuesDisplayReducer from 'slices/issuesDisplaySlice';
import issuesReducer from 'slices/issuesSlice';
import repoDetailsReducer from 'slices/repoDetailsSlice';

const rootReducer = combineReducers({
  issuesDisplay: issuesDisplayReducer,
  repoDetails: repoDetailsReducer,
  issues: issuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
