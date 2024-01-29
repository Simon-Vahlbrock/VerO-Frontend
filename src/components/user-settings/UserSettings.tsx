import { FC, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Tooltip,
    useTheme
} from '@mui/material';
import Header from '../shared/header/Header.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { saveLogout, saveUserUpdate } from '../../redux-modules/user/actions.ts';
import { selectUser } from '../../redux-modules/user/selectors.ts';
import { Gender, User, UserRole, UserStatus } from '../../types/user.ts';

const UserSettings: FC = () => {
    const user = useAppSelector(selectUser)!;

    const isAdmin = user.roles.includes(UserRole.Admin);

    const [localUser, setLocalUser] = useState<Partial<User>>({});

    const theme = useTheme();

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        void dispatch(saveLogout());
    };

    const handleChange = (value: string, key: keyof User) => {
        setLocalUser((prev) => ({ ...prev, [key]: value }));
    };

    const handleBlur = async (key: keyof User) => {
        if (!localUser[key]) {
            return;
        }

        await dispatch(saveUserUpdate({
            data: { [key]: localUser[key] },
            userNameToUpdate: user.userName
        }));

        setLocalUser({});
    };

    const handleEnumChange = async (value: number, key: string) => {
        void dispatch(saveUserUpdate({
            data: { [key]: value },
            userNameToUpdate: user.userName
        }));
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
                    <Grid container spacing={2.5} sx={{ padding: '0 12px' }}>
                        <Grid item xs={6}>
                            <TextField
                                label="Vorname"
                                fullWidth
                                value={localUser.firstName ?? user.firstName}
                                onChange={(e) => handleChange(e.target.value, 'firstName')}
                                onBlur={() => handleBlur('firstName')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Nachname"
                                fullWidth
                                value={localUser.lastName ?? user.lastName}
                                onChange={(e) => handleChange(e.target.value, 'lastName')}
                                onBlur={() => handleBlur('lastName')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Telefon"
                                fullWidth
                                value={localUser.phoneNumber ?? user.phoneNumber}
                                onChange={(e) => handleChange(e.target.value, 'phoneNumber')}
                                onBlur={() => handleBlur('phoneNumber')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="E-Mail"
                                fullWidth
                                value={localUser.email ?? user.email}
                                onChange={(e) => handleChange(e.target.value, 'email')}
                                onBlur={() => handleBlur('email')}
                            />
                        </Grid>
                        {/* <Grid item xs={4}>
                            <Tooltip
                                sx={{ marginTop: '16px' }}
                                disableHoverListener={user.role !== UserRole.Member}
                                title="Sprich mit dem Vorstand, wenn du deine Rolle ändern möchtest."
                                arrow
                            >
                                <FormControl fullWidth disabled={user.role === UserRole.Member}>
                                    <InputLabel>Rolle</InputLabel>
                                    <Select
                                        label="Rolle"
                                        value={user.role}
                                        onChange={(e) => handleEnumChange(e.target.value as UserRole, 'role')}
                                    >
                                        <MenuItem value={UserRole.Member}>Mitglied</MenuItem>
                                        <MenuItem value={UserRole.BoardMember}>Vorstand</MenuItem>
                                        <MenuItem value={UserRole.ExecutiveBoardMember}>GF Vorstand</MenuItem>
                                    </Select>
                                </FormControl>
                            </Tooltip>
                        </Grid> */}
                        <Grid item xs={4}>
                            <Tooltip
                                sx={{ marginTop: '16px' }}
                                disableHoverListener={isAdmin}
                                title="Sprich mit dem Vorstand, wenn du deinen Status ändern möchtest."
                                arrow
                            >
                                <FormControl fullWidth disabled={!isAdmin}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        label="Status"
                                        value={user.status}
                                        onChange={(e) => handleEnumChange(e.target.value as UserStatus, 'status')}
                                    >
                                        <MenuItem value={UserStatus.Aktiv}>Aktiv</MenuItem>
                                        <MenuItem value={UserStatus.Passiv}>Passiv</MenuItem>
                                        <MenuItem value={UserStatus.Left}>Ausgetreten</MenuItem>
                                        <MenuItem value={UserStatus.Special}>Ehrenmitglied</MenuItem>
                                    </Select>
                                </FormControl>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth sx={{ marginTop: '16px' }}>
                                <InputLabel>Geschlecht</InputLabel>
                                <Select
                                    label="Geschlecht"
                                    value={user.gender}
                                    onChange={(e) => handleEnumChange(e.target.value as Gender, 'gender')}
                                >
                                    <MenuItem value={Gender.Male}>Männlich</MenuItem>
                                    <MenuItem value={Gender.Female}>Weiblich</MenuItem>
                                    <MenuItem value={Gender.Diverse}>Divers</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Straße"
                                fullWidth
                                style={{ marginTop: '16px' }}
                                value={localUser.address ?? user.address}
                                onChange={(e) => handleChange(e.target.value, 'address')}
                                onBlur={() => handleBlur('address')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Postleitzahl"
                                fullWidth
                                value={localUser.zipCode ?? user.zipCode}
                                onChange={(e) => handleChange(e.target.value, 'zipCode')}
                                onBlur={() => handleBlur('zipCode')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Stadt"
                                fullWidth
                                value={localUser.city ?? user.city}
                                onChange={(e) => handleChange(e.target.value, 'city')}
                                onBlur={() => handleBlur('city')}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '24px 0 16px'
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
