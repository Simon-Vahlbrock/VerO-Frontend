import { FC, useEffect, useMemo, useState } from 'react';
import { CircularProgress, createTheme, CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { getThemeByMode } from '../utils/theme.ts';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import Login from './login/Login.tsx';
import { getAccessToken } from '../redux-modules/user/actions.ts';
import { selectAppView } from '../redux-modules/app-view/selectors.ts';
import { AppView } from '../redux-modules/app-view/slice.ts';
import Overview from './overview/Overview.tsx';
import UserSettings from './user-settings/UserSettings.tsx';

const App: FC = () => {
    const appView = useAppSelector(selectAppView);

    const [mode, setMode] = useState<PaletteMode>('dark');

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getAccessToken());
    }, [dispatch]);

    const theme = useMemo(() => createTheme(getThemeByMode(mode)), [mode]);

    const view = useMemo(() => {
        switch (appView) {
            case AppView.Login:
                return <Login/>;
            case AppView.Overview:
                return <Overview/>;
            case AppView.UserSettings:
                return <UserSettings/>;
            case AppView.Loading:
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress/>
                    </div>
                );
            default:
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        Ups, da ist etwas schief gelaufen. Diese Page wurde nicht gefunden.
                    </div>
                );
        }
    }, [appView]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {view}
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
