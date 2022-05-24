import * as React from 'react';
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
import {VariantType, useSnackbar} from 'notistack';

import { Link as LinkTo } from "react-router-dom";

import {useForm, SubmitHandler} from "react-hook-form";
import UserLoginDto from "../../entities/User/UserLoginDto";
import {useState} from "react";
import UserServices from "../../services/UserServices";
import useAuth from "../../shared/hooks/useAuth";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const {enqueueSnackbar} = useSnackbar();

    const {
        register,
        handleSubmit,
        watch, formState: {errors}
    } = useForm<UserLoginDto>();

    const onSubmit: SubmitHandler<UserLoginDto> = async data => {
        setIsLoading(true);

        let response = await UserServices.LoginUser(data);

        if (response.Status) {
            auth.setToken(response.Data.token);
        } else {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
        }

        setIsLoading(false);
    }

    return (
        <>
            <Container
                component="main"
                maxWidth="xs"
            >
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={Boolean(errors.Password?.message)}
                            helperText={errors.Password?.message}
                            {...register("Password", {
                                minLength: {
                                    value: 7,
                                    message: "Password must contain at lest 8 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Password must contain at most 20 characters",
                                },
                                required: "Password is required",
                            })
                            }
                        />
                        <FormControlLabel
                            control={<Checkbox aria-checked color="primary"/>}
                            label="Remember me"
                        />
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link component={LinkTo} to="/PasswordRecovery" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={LinkTo} to="/Registration" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}