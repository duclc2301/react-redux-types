import { Action, configureStore } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useTypedSelector = createSelectorHook<RootState>();
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export default store;
