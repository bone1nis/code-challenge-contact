import { Typography, AppBar, Toolbar } from "@mui/material";
import theme from "../theme";

const Header: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" color={theme.palette.primary.contrastText}>
                    EasyContacts
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;