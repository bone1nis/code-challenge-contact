import { Typography, AppBar, Toolbar, Box } from "@mui/material";

import theme from "../theme";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Typography variant="body2" color={theme.palette.primary.contrastText}>
                        © {currentYear} EasyContacts. Все права защищены.
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;