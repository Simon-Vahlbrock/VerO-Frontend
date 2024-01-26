import { PaletteMode, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            secondaryBackgroundColor: string;
            dividerColor: string;
        };
    }

    interface ThemeOptions {
        custom: {
            secondaryBackgroundColor: string;
            dividerColor: string;
        };
    }
}

export const getThemeByMode = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: '#4cb1b8'
        },
        secondary: {
            main: '#8ddce2'
        },
        ...(mode === 'light' ? {
            background: {
                default: '#f3f7f7'
            }
        } : {
            background: {
                default: '#080c0c'
            }
        })
    },
    typography: {
        fontFamily: 'sans-serif',
        fontSize: 14,
        allVariants: {
            color: mode === 'light' ? '#050606' : '#f9fafa'
        }
    },
    custom: {
        secondaryBackgroundColor: mode === 'light' ? '#f1f1f1' : '#171717',
        dividerColor: mode === 'light' ? '#e1e1e1' : '#343434',
    }
});
