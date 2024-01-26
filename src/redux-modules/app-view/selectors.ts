import { RootState } from '../store.ts';

export const selectAppView = (state: RootState) => state.appView.appView;
