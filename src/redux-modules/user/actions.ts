import { AppDispatch, GetAppState } from '../store.ts';
import { postLogin, postLogout, postRefreshToken } from '../../api/user/post.ts';
import { setAccessToken, setUser } from './slice.ts';
import { AppView, setAppView } from '../app-view/slice.ts';
import { selectAccessToken } from './selectors.ts';
import { getUser } from '../../api/user/get.ts';

interface LoginUserOptions {
    userName: string;
    password: string;
}

export const loginUser = ({ userName, password }: LoginUserOptions) => async (dispatch: AppDispatch) => {
    const { status, data } = await postLogin({
        userName,
        password,
    });

    if (status !== 200 || !data) {
        return { message: 'Ungültiger Benutzername oder Kennwort' };
    }

    localStorage.setItem('refreshToken', data.refreshToken);

    dispatch(setAccessToken(data.accessToken));

    await dispatch(loadUser());

    dispatch(setAppView(AppView.Overview));

    return { message: null };
};

export const getAccessToken = () => async (dispatch: AppDispatch) => {
    dispatch(setAppView(AppView.Loading));

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        dispatch(setAppView(AppView.Login));

        return;
    }

    const { status, data } = await postRefreshToken({
        refreshToken,
        type: 'access',
    });

    if (status !== 200 || !data?.accessToken) {
        dispatch(setAppView(AppView.Login));

        return;
    }

    dispatch(setAccessToken(data.accessToken));

    await dispatch(loadUser());

    dispatch(setAppView(AppView.Overview));
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('refreshToken');

    dispatch(setAppView(AppView.Login));

    dispatch(setAccessToken(null));
    dispatch(setUser(null));
};

export const loadUser = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectAccessToken(getState());

    if (!accessToken) {
        return;
    }

    const { status, data } = await getUser({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setUser(data));
};

export const saveLogout = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectAccessToken(getState());

    if (!accessToken) {
        return;
    }

    const { status } = await postLogout({ accessToken });

    if (status !== 200) {
        return;
    }

    localStorage.removeItem('refreshToken');

    dispatch(setUser(null));
    dispatch(setAccessToken(null));
    dispatch(setAppView(AppView.Login));
};
