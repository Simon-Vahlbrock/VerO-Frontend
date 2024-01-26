import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { User } from '../../types/user.ts';

interface GetUserOptions {
    accessToken: string;
}

export const getUser = async ({ accessToken }: GetUserOptions): Promise<ApiFunctionResult<User>> => {
    const response = await request<User>({
        method: 'GET',
        route: '/users/user',
        accessToken
    });

    return { status: response.status, data: response.data };
};
