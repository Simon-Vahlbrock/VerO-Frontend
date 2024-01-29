import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { User } from '../../types/user.ts';

interface PatchUserOptions {
    accessToken: string;
    data: Partial<User>;
    userNameToUpdate: string;
}

export const patchUser = async (
    {
        accessToken,
        data,
        userNameToUpdate
    }: PatchUserOptions): Promise<ApiFunctionResult> => {
    const response = await request<null, Partial<User>>({
        route: `/users/update/${userNameToUpdate}`,
        method: 'PATCH',
        body: data,
        accessToken
    });

    return { status: response.status };
};
