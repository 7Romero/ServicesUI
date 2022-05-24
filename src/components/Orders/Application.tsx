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

type Props = {
    id: string
}

export default function Application(props: Props) {

    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch, formState: {errors}
    } = useForm<ApplicationDto>();

    const onSubmit: SubmitHandler<ApplicationDto> = async data => {
        data.orderId = props.id;

        let response = await ApplicationServices.CreateApplication(data);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
            return;
        }

        navigate(`/FindWork`);

        enqueueSnackbar("Application has been submitted", {
                variant: "success"
            }
        );
    }

    return(
        <Card
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                mt: 5,
                p: "20px",
            }}
        >
            <Typography variant="h4">
                Your application:
            </Typography>

            <Divider
                sx={{m: "20px 0"}}
                variant="middle"
            />

            <Box>
                <Typography variant="h5">
                    Budget
                </Typography>
                <TextField
                    margin="normal"
                    required
                    id="budget"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>
                    }}
                    error={Boolean(errors.suggestedPrice?.message)}
                    helperText={errors.suggestedPrice?.message}
                    {...register("suggestedPrice", {
                        pattern: {
                            value: /^\d/i,
                            message: "Please enter a number"
                        },
                        required: "Budget is required",
                    })
                    }
                />
                <Typography variant="h5">
                    Timing
                </Typography>
                <TextField
                    margin="normal"
                    required
                    id="budget"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">days</InputAdornment>
                    }}
                    error={Boolean(errors.suggestedTime?.message)}
                    helperText={errors.suggestedTime?.message}
                    {...register("suggestedTime", {
                        pattern: {
                            value: /^\d/i,
                            message: "Please enter a number"
                        },
                        required: "Timing is required",
                    })
                    }
                />
                <Typography variant="h5">
                    Description
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    multiline
                    rows={6}
                    error={Boolean(errors.description?.message)}
                    helperText={errors.description?.message}
                    {...register("description", {
                        minLength: {
                            value: 5,
                            message: "Description must contain at lest 5 characters",
                        },
                        maxLength: {
                            value: 5000,
                            message: "Description must contain at most 5000 characters",
                        },
                        required: "Description is required",
                    })
                    }
                />
            </Box>

            <Button
                type="submit"
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    background: "#007d70",
                    '&:hover': {
                        background: "#004a42",
                    },
                }}
            >
                Send
            </Button>
        </Card>
    );
}
