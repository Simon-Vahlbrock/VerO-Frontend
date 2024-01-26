import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { User } from '../../types/user.ts';

interface PatchUserOptions {
    accessToken: string;
    body: Partial<User>;
}

export const patchUser = async ({ accessToken, body }: PatchUserOptions): Promise<ApiFunctionResult> => {
    const response = await request<null, Partial<User>>({
        route: '/users/update',
        method: 'PATCH',
        body,
        accessToken
    });

    return { status: response.status };
};
