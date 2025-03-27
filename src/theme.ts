import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#ED760E",
            contrastText: "#fff"
        },
        secondary: {
            main: "#9e9e9e"
        },
        text: {
            primary: "#000"
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    wordBreak: 'break-word',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '&[aria-hidden]': {
                        pointerEvents: 'none',
                    },
                },
            },
        },
    },
});

export default theme;