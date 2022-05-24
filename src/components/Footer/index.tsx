import * as React from "react";
import {Box, Button, Container, Link, Typography} from "@mui/material";
import { Link as LinkTo } from "react-router-dom";

const pages = ["Home", "Find Work", "Freelancers"];

const pageStyle = {
    button: {
        fontFamily: "monospace",
        fontSize: "16px",
        fontWeight: "800",
        color: "white",
        textAlign: "center",
        flex: {xs: "1 1 100%", md: "0 1 auto"},
        '&:hover': {
            background: "#004a42",
        },
    },
    logoName: {
        display: "flex",
        fontFamily: "monospace",
        fontSize: "24px",
        fontWeight: "800",
        letterSpacing: ".2rem",
        color: "white",
        textDecoration: "none",
    },
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="white" {...props}>
            {'Copyright © '}
            <Link component={LinkTo} to="/PasswordRecovery" color="inherit">
                Services
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {

    return (
        <Box sx={{
            background: "#007d70",
        }}>
            <Container
                component="footer"
                maxWidth="xl"
                sx={{p: 2}}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flexDirection: {xs: "column", md: "row"},
                }}
                >
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        flexDirection: {xs: "column", md: "row"},
                    }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component={LinkTo}
                            to="/"
                            sx={pageStyle.logoName}
                        >
                            SERVICES
                        </Typography>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={pageStyle.button}
                                    component={LinkTo}
                                    to={"/" + page.split(' ').join('')}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Box>
                        <Copyright sx={{p: "10px"}}/>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}