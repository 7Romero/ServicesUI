import {useCallback, useEffect, useState} from "react";
import OrderServices from "../../services/OrderServices";
import usePaginate from "../../shared/hooks/UsePaginate";
import {useSnackbar} from "notistack";
import OrderDto from "../../entities/Order/OrderDto";
import {RequestFiltersType} from "../../shared/contexts/PaginateContext";
import useAuth from "../../shared/hooks/useAuth";
import OrderList from "../../components/FindWork/OrderList";
import {Box, Card, Container, Pagination, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PageTitle from "../../components/PageTitle";

export default function MyOrders() {

    const [isSet, setIsSet] = useState<boolean>(false);
    const [orders, setOrders] = useState<OrderDto[]>([]);

    const auth = useAuth();
    const paginate = usePaginate();
    const {enqueueSnackbar} = useSnackbar();

    const [pageQty, setPageQty] = useState(1);

    const fetchData = useCallback(async () => {
        if(!isSet) return;

        const response = await OrderServices.GetPagedOrders(paginate);

        if (response.Status) {
            setPageQty(Math.ceil(response.Data.total / response.Data.pageSize));
            setOrders(response.Data.items);

            console.log(response.Data);
        } else {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
        }
    }, [paginate]);

    useEffect(() => {
        if(typeof auth.user?.id === "undefined") return;

        const requestFilters: RequestFiltersType = {
            logicalOperator: 0,
            filters: [
                {
                    comparisonOperators: 2,
                    path: "UserId",
                    value: auth.user.id
                }
            ]
        }

        paginate.setRequestFilters(requestFilters);
        setIsSet(true);
    }, [])

    useEffect(() => {
        fetchData();

    }, [fetchData])

    return(
        <Box
            sx={{
                height: "100%",
                background: "#e9ebee",
            }}
        >
            <Box
                sx={{
                    background: "#fff",
                    mb: 2,
                    p: "20px 0"
                }}
            >
                <PageTitle name="My orders" />
            </Box>

            <Container
                component="main"
                maxWidth="xl"
            >
                <Box>
                    {orders && orders.length > 0 ? (
                        <>
                            {
                                orders.map((order) => {

                                    return (
                                        <OrderList key={order.id} data={order}/>
                                    );
                                })
                            }
                        </>
                    ): (
                        <Card
                            sx={{
                                p: "30px",
                            }}
                        >
                            <Typography variant="subtitle1">
                                No orders
                            </Typography>
                        </Card>
                    )}
                </Box>

                <Box
                    component={Card}
                >
                    <Stack spacing={2}
                    >
                        {!!pageQty && (
                            <Pagination
                                count={pageQty}
                                page={paginate.pageIndex+1}
                                onChange={(_, num) => paginate.setPageIndex(num-1)}
                                showFirstButton
                                showLastButton
                                sx={{marginY: "10px", marginX: "auto"}}
                            />
                        )}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}