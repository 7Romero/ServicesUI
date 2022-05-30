import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import Container from "@mui/material/Container";
import {Button, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../shared/hooks/useAuth";

const pages = ["Find Work", "My Jobs", "My Orders"];
const guestsButtons = ["Login", "Registration"];

export default function Header() {
    const pageStyle = {
        button: {
            my: 2,
            mr: 1,
            fontFamily: "monospace",
            fontSize: "16px",
            fontWeight: "800",
            color: "white",
            textAlign: "center",
            display: "block",
            '&:hover': {
                background: "#004a42",
            },
        },
        logoName: {
            mr: 2,
            my: 2,
            display: "flex",
            fontFamily: "monospace",
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: ".2rem",
            color: "white",
            textDecoration: "none",
        },
        burgerMenu: {
            position: "fixed",
            top: () => buttonIsOpen ? "0" : "-100%",
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,125,112,0.85)",

            display: "flex",
            flexDirection: "column",

            pt: "60px",
            transition: "all 0.3s ease 0s",
            overflow: "auto",
            zIndex: -1,
        }
    }

    const auth = useAuth();
    const navigate = useNavigate();

    const onLogOut = () => {
        handleUserMenuClose();

        auth.logOut();
        navigate("/login");
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openUserMenu = Boolean(anchorEl);
    const [buttonIsOpen, setButtonIsOpen] = useState<boolean>(false);

    const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavMenu = () => {
        setButtonIsOpen(!buttonIsOpen);

        if(!buttonIsOpen){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "visible";
        }
    };

    return (

        <AppBar
            position="fixed"
            sx={{
                "&:before": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    background: "#007d70",
                },
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters={true}
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={pageStyle.logoName}
                        >
                            SERVICES
                        </Typography>

                        <Box sx={{display: {xs: "none", md: "flex"}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={pageStyle.button}
                                    component={Link}
                                    to={"/" + page.split(' ').join('')}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Box>
                        <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                            {auth.isLoaded && (
                                auth.user ? (
                                    <>
                                        <Button
                                            id="basic-button"
                                            sx={pageStyle.button}
                                            aria-controls={openUserMenu ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openUserMenu ? 'true' : undefined}
                                            onClick={handleUserMenuClick}
                                        >
                                            {auth.user.username}
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={openUserMenu}
                                            onClose={()=>{setAnchorEl(null)}}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem component={Link} to={`/Users/${auth.user.username}`}>Profile</MenuItem>
                                            <MenuItem onClick={onLogOut}>Logout</MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <>
                                        {guestsButtons.map((guestsButton) => (
                                            <Button
                                                key={guestsButton}
                                                sx={pageStyle.button}
                                                component={Link}
                                                to={"/" + guestsButton}
                                            >
                                                {guestsButton}
                                            </Button>
                                        ))}
                                    </>
                                )
                            )}
                        </Box>
                    </Box>

                    <Box sx={{display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleNavMenu}
                            color="inherit"
                        >
                            {buttonIsOpen ? (<CloseIcon/>) : (<MenuIcon/>)}
                        </IconButton>

                        <Box
                            sx={pageStyle.burgerMenu}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleNavMenu}
                                    sx={pageStyle.button}
                                    component={Link}
                                    to={"/" + page.split(' ').join('')}
                                >
                                    {page}
                                </Button>
                            ))}
                            {auth.isLoaded && (
                                auth.user ? (
                                    <>
                                        <Button
                                            key="Profile"
                                            onClick={handleNavMenu}
                                            sx={pageStyle.button}
                                            component={Link}
                                            to={`/Users/${auth.user.username}`}
                                        >
                                            Profile
                                        </Button>
                                        <Button
                                            key="Logout"
                                            onClick={onLogOut}
                                            sx={pageStyle.button}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {guestsButtons.map((guestsButton) => (
                                            <Button
                                                key={guestsButton}
                                                onClick={handleNavMenu}
                                                sx={pageStyle.button}
                                                component={Link}
                                                to={"/" + guestsButton}
                                            >
                                                {guestsButton}
                                            </Button>
                                        ))}
                                    </>
                                )
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}