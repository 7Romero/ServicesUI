import {Box, Card, Container, Divider, InputAdornment, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import OrderCreateDto from "../../entities/Order/OrderCreateDto";
import OrderServices from "../../services/OrderServices";
import {useSnackbar} from "notistack";
import ApplicationDto from "../../entities/Application/ApplicationDto";
import ApplicationServices from "../../services/ApplicationServices";
import UserInfo from "../User/UserInfo";
import {useCallback, useEffect, useState} from "react";

type Props = {
    id: string
}

export default function ApplicationList(props: Props) {

    const {enqueueSnackbar} = useSnackbar();

    const [application, setApplication] = useState<ApplicationDto[]>()

    const fetchData = useCallback(async () => {

        // const response = await OrderServices.GetApplication(props.id);
        //
        // if (!response.Status) {
        //     enqueueSnackbar(response.Message, {
        //         variant: response.Variant
        //     });
        //
        //     return;
        // }
        //
        // setApplication(response.Data);

    }, []);

    useEffect(() => {
        fetchData()

    }, [fetchData])

    return(
        <Card
            sx={{
                p: "30px",
            }}
        >
            {/*<UserInfo user={}/>*/}
            <Typography
                variant="subtitle1"
                sx={{
                    m: "20px 0",
                }}
            >
                test
            </Typography>
        </Card>
    );
}
