import * as React from "react";
import {Box, Card, CardMedia, Typography} from "@mui/material";

import avatar from "./avatar.png"
import {useEffect, useState} from "react";
import timeCalc from "../../../shared/helper/TimeCalc";
import UserDto from "../../../entities/User/UserDto";

type Props = {
    user: UserDto,
}

export default function UserInfo(props: Props) {

    const [data, setData] = useState<string>("");

    const calcData = () => {
        let result = timeCalc(new Date(props.user.registrationDate))

        setData(`${result} in the service`)
    }

    useEffect(() => {
        calcData()

    }, [props.user.registrationDate])

    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Box
                sx={{
                    maxHeight: "120px",
                    maxWidth: "120px",
                    mr: 3,
                }}
            >
                <CardMedia
                    component="img"
                    alt="Avatar"
                    image={avatar}
                    sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                    }}
                />
            </Box>
            <Box>
                <Box>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            display: "inline",
                        }}
                    >
                        {props.user.username + " "}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            display: "inline",
                        }}
                    >
                        {props.user.firstName + " "}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            display: "inline",
                        }}
                    >
                        {props.user.lastName + " "}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            display: "inline",
                        }}
                    >
                        {data}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
