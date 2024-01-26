import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface PostLoginOptions {
    userName: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}

export const postLogin = async (
    {
        userName,
        password
    }: PostLoginOptions): Promise<ApiFunctionResult<LoginResponse>> => {
    const response = await request<LoginResponse, PostLoginOptions>({
        method: 'POST',
        route: '/users/login',
        body: { userName, password }
    });

    return { status: response.status, data: response.data };
};

interface PostRefreshTokenOptions {
    type: 'access' | 'refresh';
    refreshToken: string;
}

interface RefreshTokenResponse {
    accessToken?: string;
    refreshToken?: string;
}

export const postRefreshToken = async (
    {
        type,
        refreshToken
    }: PostRefreshTokenOptions): Promise<ApiFunctionResult<RefreshTokenResponse>> => {
    const response = await request<RefreshTokenResponse, { refreshToken: string }>({
        method: 'POST',
        route: `/users/refresh-token${type === 'refresh' ? '?isRefreshToken=true' : ''}`,
        body: { refreshToken }
    });

    return { status: response.status, data: response.data };
};

interface PostLogoutOptions {
    accessToken: string;
}

export const postLogout = async ({ accessToken }: PostLogoutOptions): Promise<ApiFunctionResult> => {
    const response = await request({
        method: 'POST',
        route: '/users/logout',
        accessToken
    });

    return { status: response.status };
};
