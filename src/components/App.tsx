import { FC, useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getThemeByMode } from '../utils/theme.ts';

const App: FC = () => {
    const [mode, setMode] = useState<PaletteMode>('dark');

    const theme = useMemo(() => createTheme(getThemeByMode(mode)), [mode]);

    return (
        <ThemeProvider theme={theme}>

        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
