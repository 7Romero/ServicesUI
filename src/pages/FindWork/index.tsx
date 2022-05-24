import * as React from "react";
import {
    Box,
    Card,
    Container, Divider, IconButton, InputAdornment, Pagination, Stack,
} from "@mui/material";
import OrderList from "../../components/FindWork/OrderList";
import NavBar from "../../components/FindWork/NavBar";
import BigButton from "../../components/BigButton";
import {useCallback, useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import OrderServices from "../../services/OrderServices";
import OrderDto from "../../entities/Order/OrderDto";
import PageTitle from "../../components/PageTitle";
import usePaginate from "../../shared/hooks/UsePaginate";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import {FilterType} from "../../shared/contexts/PaginateContext";

const pageStyle = {
    wrapper: {
        pt: 5,
        pb: 5,
        display: "flex",
        flexDirection: {xs: "column", md: "row"},
    },
    sideBar: {
        mr: {xs: 0, md: 3},
        mb: 3,
        width: "100%",
        flex: {xs: "0 1 100%", md: "0 1 25%"},
        alignSelf: "flex-start",
    },
    pageContent: {
        display: "flex",
        width: "100%",
        flex: {xs: "0 1 100%", md: "0 1 75%"},
        flexDirection: "column",
        alignSelf: "flex-start",
    },
    bigButtonStyle: {
        p: "20px 30px",
    }
}

function FindWork() {
    const [orders, setOrders] = useState<OrderDto[]>([]);

    const paginate = usePaginate();
    const {enqueueSnackbar} = useSnackbar();

    const [pageQty, setPageQty] = useState(1);

    const [searchValue, setSearchValue] = useState("");

    const handlerSearch = () => {
        const requestFilters: FilterType = {
            logicalOperator: 1,
            filters: [
                {
                    comparisonOperators: 1,
                    path: "Title",
                    value: searchValue
                },
                {
                    comparisonOperators: 1,
                    path: "Description",
                    value: searchValue
                }
            ]
        }

        paginate.setRequestFilters(requestFilters);
    }

    const fetchData = useCallback(async () => {
        const response = await OrderServices.GetPagedOrders(paginate);

        if (response.Status) {
            setPageQty(Math.ceil(response.Data.total / response.Data.pageSize));
            setOrders(response.Data.items);
        } else {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
        }
    }, [paginate]);

    useEffect(() => {
        fetchData()

    }, [fetchData])

    return (
        <Box
            sx={{
                height: "100%",
                background: "#e9ebee",
            }}
        >
            <Box
                sx={{
                    background: "#fff",
                    p: "20px 0"
                }}
            >
                <PageTitle name="Fulfillment of orders" />
            </Box>

            <Container
                component="main"
                maxWidth="xl"
            >

                <Box
                    sx={pageStyle.wrapper}
                >
                    <Box
                        component={Card}
                        sx={pageStyle.sideBar}
                    >
                        <Box
                            sx={pageStyle.bigButtonStyle}
                        >
                            <BigButton name="Place an order" link="/CreateOrder"/>
                        </Box>

                        <Divider variant="middle"/>

                        <Box>
                            <NavBar/>
                        </Box>
                    </Box>

                    <Box
                        sx={pageStyle.pageContent}
                    >
                        <Card
                            sx={{
                                mb: 2,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: "1 1 auto",
                                    p: "0px 20px 10px",
                                }}
                            >
                                <TextField
                                    sx={{
                                        width: "100%",
                                    }}
                                    label="Order search"
                                    margin="normal"
                                    required
                                    id="budget"
                                    onChange={(e)=>{setSearchValue(e.target.value)}}
                                />
                            </Box>

                            <Box
                                sx={{
                                    alignItem: "center",
                                    pr: 2,
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="search"
                                    color="inherit"
                                    onClick={handlerSearch}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </Card>

                        {orders &&
                            orders.map((order) => {

                                return (
                                    <OrderList key={order.id} data={order}/>
                                );
                            })
                        }

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
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default FindWork;