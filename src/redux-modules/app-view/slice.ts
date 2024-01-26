import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AppView {
    Loading = 0,
    Login = 1,
    Overview = 2,
}

interface AppViewState {
    appView: AppView;
}

const initialState: AppViewState = {
    appView: AppView.Loading,
};

const slice = createSlice({
    name: 'appView',
    initialState,
    reducers: {
        setAppView: (state, { payload }: PayloadAction<AppView>) => {
            state.appView = payload;
        }
    }
});

export const { setAppView } = slice.actions;
export const appViewReducer = slice.reducer;
