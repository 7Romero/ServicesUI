import * as React from "react";
import {Box, Button, Card, Container} from "@mui/material";
import PageTitle from "../../components/PageTitle";
import Typography from "@mui/material/Typography";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import OrderServices from "../../services/OrderServices";
import {useSnackbar} from "notistack";
import UserInfo from "../../components/User/UserInfo";
import OrderDto from "../../entities/Order/OrderDto";
import useAuth from "../../shared/hooks/useAuth";
import Application from "../../components/Orders/Application";
import user from "../../shared/api/endpoints/user";
import ApplicationList from "../../components/Orders/ApplicationList";

export default function Orders() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const auth = useAuth();
    const {id} = useParams();

    const [orderState, setOrderState] = useState<OrderDto>();

    const handlerDeleteButton = async () => {
        if (typeof id === "undefined") return;

        let response;

        if (auth.user?.roles?.find((role) => role === "Administrator")) {
            response = await OrderServices.DeleteOrderAdmin(id);
        } else {
            response = await OrderServices.DeleteOrder(id);
        }

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });

            return;
        }

        navigate("/FindWork");
        enqueueSnackbar("Order has been removed", {
            variant: "success"
        });
    }

    const fetchData = useCallback(async () => {

        if (typeof id === "undefined") return;

        const response = await OrderServices.GetOrder(id);

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

        setOrderState(response.Data);

    }, [id]);

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
            {orderState && (
                <>
                    <Box
                        sx={{
                            background: "#fff",
                        }}
                    >
                        <Container
                            maxWidth="xl"
                            sx={{
                                p: "20px 0"
                            }}
                        >
                            <PageTitle name={orderState.title}/>
                        </Container>
                    </Box>

                    <Container
                        maxWidth="xl"
                        sx={{
                            p: "20px 0",
                        }}
                    >
                        <Card
                            sx={{
                                p: "30px",
                            }}
                        >
                            <UserInfo user={orderState.user}/>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    m: "20px 0",
                                }}
                            >
                                {orderState.description}
                            </Typography>

                            {auth.user &&
                                (auth.user.roles?.find((role) => role === "Administrator") ||
                                    auth.user.username === orderState.user.username)
                                && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box>
                                            <Button
                                                component={Link}
                                                to={`/EditOrder/${id}`}
                                                variant="contained"
                                                color="success"
                                            >
                                                Edit order
                                            </Button>
                                        </Box>
                                        <Box
                                            sx={{
                                                mt: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={handlerDeleteButton}
                                            >
                                                Delete order
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                        </Card>

                        {auth.user && (
                            <>
                                {auth.user.username === orderState.user.username ? (
                                    <>
                                        <Box
                                            sx={{
                                                mt: 2,
                                            }}
                                        >
                                            <ApplicationList id={orderState.id}/>
                                        </Box>
                                    </>
                                ) : (
                                    <Box
                                        sx={{
                                            mt: 2,
                                        }}
                                    >
                                        <Application id={orderState.id}/>
                                    </Box>
                                )
                                }
                            </>
                        )}
                    </Container>
                </>
            )}
        </Box>
    );
}