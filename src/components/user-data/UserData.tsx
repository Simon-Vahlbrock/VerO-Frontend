import { FC } from 'react';
import { Box } from '@mui/material';
import Header from '../shared/header/Header.tsx';

const UserData: FC = () => {
    return (
        <Box>
            <Header/>
            UserData
        </Box>
    );
};

UserData.displayName = 'UserData';

export default UserData;
