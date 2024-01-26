import { RootState } from '../store.ts';

const selectUserState = (state: RootState) => state.user;

export const selectAccessToken = (state: RootState) => selectUserState(state).accessToken;
export const selectUser = (state: RootState) => selectUserState(state).user;
export const selectLoadingState = (state: RootState) => selectUserState(state).loadingState;
