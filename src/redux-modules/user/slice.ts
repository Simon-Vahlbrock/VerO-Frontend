import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user.ts';

interface UserState {
    user: User | null;
    accessToken: string | null;
}

const initialState: UserState = {
    user: null,
    accessToken: null,
};
const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState['user']>) {
            state.user = action.payload;
        },
        setAccessToken(state, action: PayloadAction<UserState['accessToken']>) {
            state.accessToken = action.payload;
        }
    },
});

export const { setAccessToken, setUser } = slice.actions;
export const userReducer = slice.reducer;
