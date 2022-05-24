import * as React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import PageTitle from "../../components/PageTitle";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useCallback, useEffect, useState} from "react";
import UserServices from "../../services/UserServices";
import useAuth from "../../shared/hooks/useAuth";
import UserDto from "../../entities/User/UserDto";
import {useSnackbar} from "notistack";
import UserUpdateDto from "../../entities/User/UserUpdateDto";
import {useNavigate} from "react-router-dom";

export default function EditProfile() {

    const [userState, setUserState] = useState<UserDto>();
    const {enqueueSnackbar} = useSnackbar();

    const auth = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch, formState: {errors}
    } = useForm<UserUpdateDto>();

    const onSubmit: SubmitHandler<UserUpdateDto> = async data => {
        let response = await UserServices.UpdateUser(data);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
            return;
        }

        if(typeof userState === "undefined"){
            navigate("/")
            return;
        }

        navigate(`/Users/${userState.username}`);

        enqueueSnackbar("Profile has been successfully updated", {
                variant: "success"
            }
        );
    }

    const fetchData = useCallback(async () => {
        if(typeof auth.user === "undefined") return;
        if(typeof auth.user.username === "undefined") return;

        const response = await UserServices.GetUser(auth.user.username);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });
            return;
        }

        setUserState(response.Data);
    }, [])

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
            <Box
                sx={{
                    background: "#fff",
                    p: "20px 0"
                }}
            >
                <PageTitle name="Personal information" />
            </Box>

            {userState && (
                <Container
                    component="main"
                    maxWidth="xl"
                >
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
                            UserName:
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="userName"
                            value={userState.username}
                            disabled={true}
                        />
                        <Typography variant="h5">
                            Firstname:
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            value={userState.firstName}
                            disabled={true}
                        />
                        <Typography variant="h5">
                            Lastname:
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="lastname"
                            value={userState.lastName}
                            disabled={true}
                        />
                        <Typography variant="h5">
                            Title:
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            autoComplete="title"
                            defaultValue={userState.descriptionTitle}
                            error={Boolean(errors.descriptionTitle?.message)}
                            helperText={errors.descriptionTitle?.message}
                            {...register("descriptionTitle", {
                                minLength: {
                                    value: 5,
                                    message: "Title must contain at lest 5 characters",
                                },
                                maxLength: {
                                    value: 120,
                                    message: "Title must contain at most 120 characters",
                                },
                                required: "Title is required",
                            })
                            }
                        />
                        <Typography variant="h5">
                            Description:
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            multiline
                            rows={6}
                            defaultValue={userState.description}
                            error={Boolean(errors.description?.message)}
                            helperText={errors.description?.message}
                            {...register("description", {
                                minLength: {
                                    value: 5,
                                    message: "Description name must contain at lest 5 characters",
                                },
                                maxLength: {
                                    value: 5000,
                                    message: "Description name must contain at most 5000 characters",
                                },
                                required: "Description name is required",
                            })
                            }
                        />
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
                            Update profile
                        </Button>
                    </Card>
                </Container>
            )}
        </Box>
    );
}