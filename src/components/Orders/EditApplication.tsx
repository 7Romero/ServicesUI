import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import ApplicationDto from "../../entities/Application/ApplicationDto";
import ApplicationServices from "../../services/ApplicationServices";
import {Box, Card, Divider, InputAdornment} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextEditor from "../TextEditor";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";

type Props = {
    application: ApplicationDto,
}

export default function EditApplication(props: Props) {
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
        if(typeof data.description === "undefined" || data.description === "") {
            enqueueSnackbar("Description is required", {
                    variant: "error"
                }
            );
            return;
        }

        let response;
        data.orderId = props.application.orderId;

        response = await ApplicationServices.UpdateApplication(props.application.id, data);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
            return;
        }

        navigate(`/FindWork`);

        enqueueSnackbar("Application has been edited", {
                variant: "success"
            }
        );
    }

    return (
        <Card
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                mt: 5,
                p: "20px",
            }}
        >
            <Typography variant="h5">
                Edit your application now
            </Typography>

            <Divider
                sx={{m: "20px 0"}}
                variant="middle"
            />

            <Box>
                <Typography variant="h6">
                    As you want?
                </Typography>
                <TextField
                    margin="normal"
                    required
                    id="budget"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>
                    }}
                    defaultValue={props.application.suggestedPrice}
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

                <Typography variant="h6">
                    How much time do you need?
                </Typography>
                <TextField
                    margin="normal"
                    required
                    id="time"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">days</InputAdornment>
                    }}
                    defaultValue={props.application.suggestedTime}
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
                <Typography variant="h6">
                    Details
                </Typography>
                <Box
                    sx={{
                        m: "20px 0"
                    }}
                >
                    <TextEditor
                        setValue={setValue}
                        name="description"
                        initialValue={props.application.description}
                    />
                </Box>
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
                Edit
            </Button>
        </Card>
    );
}