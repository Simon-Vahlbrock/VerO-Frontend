import { FC } from 'react';
import { Box } from '@mui/material';
import Header from '../shared/header/Header.tsx';

const Overview: FC = () => {
    return (
        <Box>
            <Header/>
        </Box>
    );
};

Overview.displayName = 'Overview';

export default Overview;
