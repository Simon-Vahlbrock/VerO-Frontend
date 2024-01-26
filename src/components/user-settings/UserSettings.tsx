import { FC } from 'react';
import { Box, Button, Paper, useTheme } from '@mui/material';
import Header from '../shared/header/Header.tsx';
import { useAppDispatch } from '../../hooks/redux.ts';
import { saveLogout } from '../../redux-modules/user/actions.ts';

const UserSettings: FC = () => {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        void dispatch(saveLogout());
    };

    return (
        <>
            <Header/>
            <Box
                sx={{
                    padding: 8,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{
                        width: '50vw',
                        backgroundColor: theme.custom.secondaryBackgroundColor,
                        backgroundImage: theme.custom.secondaryBackgroundColor,
                    }}
                >
                    <h1 style={{ paddingLeft: '20px' }}>Einstellungen</h1>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pb: '12px'
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

UserSettings.displayName = 'UserSettings';

export default UserSettings;
