import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {Link as LinkTo} from "react-router-dom";
import {useState} from "react";
import useAuth from "../../shared/hooks/useAuth";
import {useSnackbar} from "notistack";
import {SubmitHandler, useForm} from "react-hook-form";
import UserLoginDto from "../../entities/User/UserLoginDto";
import UserServices from "../../services/UserServices";
import UserRegistrationDto from "../../entities/User/UserRegistrationDto";

export default function Registration() {
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const {enqueueSnackbar} = useSnackbar();

    const {
        register,
        handleSubmit,
        setError,
        watch, formState: {errors}
    } = useForm<UserRegistrationDto>();

    const onSubmit: SubmitHandler<UserRegistrationDto> = async data => {
        setIsLoading(true);

        let responseReg = await UserServices.RegistrationUser(data);

        if (!responseReg.Status) {
            enqueueSnackbar(responseReg.Message, {
                    variant: responseReg.Variant
                }
            );
            setIsLoading(false);

            return;
        }

        let loginData: UserLoginDto = {
            Username: responseReg.Data.username,
            Password: responseReg.Data.password,
        }

        let responseLog = await UserServices.LoginUser(loginData);

        if (responseLog.Status) {
            auth.setToken(responseLog.Data.token);
        } else {
            enqueueSnackbar(responseLog.Message, {
                    variant: responseLog.Variant
                }
            );
        }

        setIsLoading(false);
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoComplete="username"
                                    autoFocus
                                    error={Boolean(errors.Username?.message)}
                                    helperText={errors.Username?.message}
                                    {...register("Username", {
                                        minLength: {
                                            value: 5,
                                            message: "Username must contain at lest 5 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Username must contain at most 20 characters",
                                        },
                                        required: "Username is required",
                                    })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    error={Boolean(errors.FirstName?.message)}
                                    helperText={errors.FirstName?.message}
                                    {...register("FirstName", {
                                        minLength: {
                                            value: 2,
                                            message: "FirstName must contain at lest 2 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "FirstName must contain at most 20 characters",
                                        },
                                        required: "FirstName is required",
                                    })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="family-name"
                                    error={Boolean(errors.LastName?.message)}
                                    helperText={errors.LastName?.message}
                                    {...register("LastName", {
                                        minLength: {
                                            value: 2,
                                            message: "LastName must contain at lest 2 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "LastName must contain at most 20 characters",
                                        },
                                        required: "LastName is required",
                                    })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    error={Boolean(errors.Email?.message)}
                                    helperText={errors.Email?.message}
                                    {...register("Email", {
                                        pattern: {
                                            value: /^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid email"
                                        },
                                        required: "Email is required",
                                    })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={Boolean(errors.Password?.message)}
                                    helperText={errors.Password?.message}
                                    {...register("Password", {
                                        minLength: {
                                            value: 8,
                                            message: "Password must contain at lest 8 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Password must contain at most 20 characters",
                                        },
                                        validate: (v) => {
                                            if(!/(?=.*[0-9])/.test(v)) {
                                                return "Passwords must contain at least 1 number"
                                            }
                                            else if(!/(?=.*[!@#$%^&*])/.test(v)) {
                                                return "Passwords must contain at least 1 special symbol"
                                            }
                                            else if(!/(?=.*[A-Z])/.test(v)) {
                                                return "Passwords must contain at least 1 capital letter"
                                            }
                                            else if(!/(?=.*[a-z])/.test(v)) {
                                                return "Passwords must contain at least 1 letter"
                                            }
                                        },
                                        required: "Password is required",
                                    })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox aria-checked color="primary"/>}
                                    label="I want to receive marketing promotions and updates via email."
                                    {...register("Notification")}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                background: "#007d70",
                                '&:hover': {
                                    background: "#004a42",
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={LinkTo} to="/Login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}