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
import ApplicationList from "../../components/Orders/ApplicationList";
import parse from 'html-react-parser';
import ApplicationServices from "../../services/ApplicationServices";
import ApplicationDto from "../../entities/Application/ApplicationDto";
import EditApplication from "../../components/Orders/EditApplication";

export default function Orders() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const auth = useAuth();
    const {id} = useParams();

    const [orderState, setOrderState] = useState<OrderDto>();
    const [application, setApplication] = useState<ApplicationDto>();

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

    const fetchApplicationData = async () => {
        if (typeof id === "undefined") return;

        const response = await ApplicationServices.GetApplicationForOrder(id);

        if (!response.Status) {
            return;
        }

        setApplication(response.Data);
    };

    const fetchOrderData = async () => {
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
    };

    const fetchData = useCallback(async () => {
        await fetchOrderData()
        await fetchApplicationData();
    }, [id]);

    useEffect(() => {
        fetchData();
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
                                {parse(orderState.description)}
                            </Typography>
                        </Card>

                        {auth.user &&
                            (auth.user.roles?.find((role) => role === "Administrator") ||
                                auth.user.username === orderState.user.username)
                            && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: "flex",
                                        justifyContent: {xs: "space-around", md: "flex-start"},
                                    }}
                                >
                                    <Box>
                                        <Button
                                            component={Link}
                                            to={`/EditOrder/${id}`}
                                            variant="contained"
                                            color="success"
                                            sx={{
                                                mr: 2,
                                            }}
                                        >
                                            Edit order
                                        </Button>
                                    </Box>
                                    <Box
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

                        {orderState.freelancer ? (
                            <Card
                                sx={{
                                    mt: 2,
                                    p: "20px",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 2,
                                    }}
                                >
                                    This order is handled by:
                                </Typography>
                                <UserInfo user={orderState.freelancer}/>
                            </Card>
                        ) : (
                            <>
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
                                                {application ? (
                                                    <EditApplication application={application}/>
                                                ) : (
                                                    <Application id={orderState.id}/>
                                                )}
                                            </Box>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Container>
                </>
            )}
        </Box>
    );
}