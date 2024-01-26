import { FC } from 'react';
import { Box, IconButton, TextField, useTheme } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppDispatch } from '../../../hooks/redux.ts';
import { AppView, setAppView } from '../../../redux-modules/app-view/slice.ts';

const Header: FC = () => {
    const theme = useTheme();

    const dispatch = useAppDispatch();
    const handleViewChange = (appView: AppView) => {
        dispatch(setAppView(appView));
    };

    return (
        <Box
            sx={{
                width: '100vw',
                bgcolor: theme.custom.secondaryBackgroundColor,
                borderBottom: `${theme.custom.dividerColor} solid 3px`,
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Box
                    sx={{
                        pl: '24px',
                        color: theme.palette.primary.main,
                        ':hover': {
                            cursor: 'pointer'
                        }
                    }}
                    onClick={() => handleViewChange(AppView.Overview)}
                >
                    <h1>VerO</h1>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        flex: '1'
                    }}
                >
                    <IconButton color="inherit" onClick={() => handleViewChange(AppView.Users)}>
                        <GroupsIcon/>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleViewChange(AppView.Calendar)}>
                        <CalendarTodayIcon/>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleViewChange(AppView.Presence)}>
                        <ChecklistIcon/>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleViewChange(AppView.Inventory)}>
                        <FormatListBulletedIcon/>
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: '0 0 auto',
                    width: '35vw',
                    padding: '0.8rem 1.6rem'
                }}
            >
                <TextField
                    label="Suche"
                    variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItem: 'center',
                    justifyContent: 'flex-end',
                    pr: 6
                }}
            >
                <IconButton
                    sx={{ mt: 'auto', mb: 'auto' }}
                    color="inherit"
                    onClick={() => handleViewChange(AppView.UserSettings)}
                >
                    <SettingsOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

Header.displayName = 'Header';

export default Header;
