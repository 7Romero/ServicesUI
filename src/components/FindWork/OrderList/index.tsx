import {Box, Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useState} from "react";
import OrderDto from "../../../entities/Order/OrderDto";
import timeCalc from "../../../shared/helper/TimeCalc";
import {Link} from "react-router-dom";

const pageStyle = {
    cardStyle: {
        flex: "1 1 100%",
        mb: 2,
    },
    baseInfo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
    },
    description: {
        flex: {xs: "0 1 100%", md: "0 1 70%"}
    },
    applications: {
        pt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: {xs: "stretch", md: "flex-end"}
    },
    additionalInfo: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    category: {
        mr: 2,
        pt: 2,
    },
    data: {
        pt: 2,
    },
    expandedButton: {
        color: "primary",
        zIndex: 5,
        "&:hover":{
            color: "rgba(0,125,112,1)",
        }
    },
}

type propsType = {
    data: OrderDto;
}

function OrderList(props: propsType ) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <>
            <Card sx={pageStyle.cardStyle}>
                <Box
                    component={Link}
                    to={`/Orders/${props.data.id}`}
                >
                    <CardContent
                    >
                        <Box
                            sx={pageStyle.baseInfo}
                        >
                            <Box
                                sx={pageStyle.description}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        color: "rgba(0,125,112,1)"
                                    }}
                                >
                                    {props.data.title}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="#000"
                                >
                                    {props.data.description}
                                </Typography>
                            </Box>
                            <Box
                                sx={pageStyle.applications}
                            >
                                <Typography
                                    variant="h5"
                                    color="red"
                                >
                                    ${props.data.suggestedPrice}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="#000"
                                >
                                    {"Created " + timeCalc(new Date(props.data.created)) + " ago"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={pageStyle.additionalInfo}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={pageStyle.category}
                            >
                                {props.data.categoryName}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={pageStyle.data}
                            >
                                {/*2 часа назад*/}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </>
    );
}

export default OrderList;