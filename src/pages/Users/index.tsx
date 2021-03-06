import * as React from "react";
import UserInfo from "../../components/User/UserInfo";
import {Box, Card, Container, Typography} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom'
import {useCallback, useEffect, useState} from "react";
import UserServices from "../../services/UserServices";
import {useSnackbar} from "notistack";
import UserDto from "../../entities/User/UserDto";
import useAuth from "../../shared/hooks/useAuth";
import BigButton from "../../components/BigButton";
import parse from "html-react-parser";
import Button from "@mui/material/Button";

export default function Users() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const {userName} = useParams();

    const auth = useAuth();

    const [userState, setUserState] = useState<UserDto>();

    const fetchData = useCallback(async () => {

        if (typeof userName === "undefined") return;

        const response = await UserServices.GetUser(userName);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });

            return;
        }

        if (!response.Data) {
            navigate("/not-found-404");
            return;
        }

        setUserState(response.Data);

    }, [userName]);

    useEffect(() => {
        fetchData()

    }, [fetchData])

    return (
        <Box
            sx={{
                height: "100%",
                background: "#e9ebee",
                pb: 5,
            }}
        >
            <Box
                sx={{
                    background: "#fff",
                }}
            >
                <Container
                    component="main"
                    maxWidth="xl"
                    sx={{
                        p: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    {userState && (
                        <>
                            <Box>
                                <UserInfo user={userState}/>
                            </Box>

                            <Box
                                sx={{
                                    mt: {xs: 2, md: 0},
                                    width: {xs: "100%", md: "auto"},
                                }}
                            >
                                {auth.user && auth.user.username === userState.username ? (
                                    <BigButton name="Edit profile" link="/EditProfile"/>
                                ) : (
                                    <BigButton name="Offer an order" link="/OfferOrder"/>
                                )}
                            </Box>
                        </>
                    )}
                </Container>
            </Box>

            {auth.user && auth.user.username === userState?.username &&
                <Container
                    component="main"
                    maxWidth="xl"
                    sx={{
                        mt: 2,
                    }}
                >
                    <Button
                        onClick={() => {navigate("/payment")}}
                        variant="contained"
                        sx={{
                            background: "#007d70",
                            '&:hover': {
                                background: "#004a42",
                            },
                        }}
                    >
                        Payment
                    </Button>
                </Container>
            }

            <Container
                component="main"
                maxWidth="xl"
                sx={{
                    mt: 3,
                }}
            >
                {userState && userState.description && userState.descriptionTitle && (
                    <Card
                        sx={{
                            p: 2,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                pb: 2,
                            }}
                        >
                            {userState.descriptionTitle}
                        </Typography>
                        <Box
                            sx={{
                                wordWrap: "break-word",
                            }}
                            dangerouslySetInnerHTML={{__html: userState.description}}
                        />
                    </Card>
                )}
            </Container>
        </Box>
    );
}