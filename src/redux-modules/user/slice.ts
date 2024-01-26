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
        },
        updateUser(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
            }
        }
    },
});

export const { setAccessToken, setUser, updateUser } = slice.actions;
export const userReducer = slice.reducer;
