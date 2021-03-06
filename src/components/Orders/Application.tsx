import {Box, Card, Divider, InputAdornment} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import ApplicationDto from "../../entities/Application/ApplicationDto";
import ApplicationServices from "../../services/ApplicationServices";
import TextEditor from "../TextEditor";

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
        if(typeof data.description === "undefined" || data.description === "") {
            enqueueSnackbar("Description is required", {
                    variant: "error"
                }
            );
            return;
        }

        data.orderId = props.id;
        let response;

        response = await ApplicationServices.CreateApplication(data);

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
                Submit an application now
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
                        initialValue={""}
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
                Send
            </Button>
        </Card>
    );
}
