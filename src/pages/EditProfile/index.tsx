import * as React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import PageTitle from "../../components/PageTitle";
import {Card, CardMedia, Input} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useCallback, useEffect, useState} from "react";
import UserServices from "../../services/UserServices";
import useAuth from "../../shared/hooks/useAuth";
import UserDto from "../../entities/User/UserDto";
import {useSnackbar} from "notistack";
import UserUpdateDto from "../../entities/User/UserUpdateDto";
import {useNavigate} from "react-router-dom";
import TextEditor from "../../components/TextEditor";
import Avatar from "@mui/material/Avatar";
import avatar from "../../components/User/UserInfo/avatar.png";

const path = "https://localhost:7200/Resources/AvatarImg/";

export default function EditProfile() {

    const [userState, setUserState] = useState<UserDto>();

    const [file, setFile] = useState<object>();
    const [imagePath, setImagePath] = useState<any>();
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
        if (typeof data.description === "undefined" || data.description === "") {
            enqueueSnackbar("Description is required", {
                    variant: "error"
                }
            );
            return;
        }

        if(file)
        {
            await UserServices.UpdateUserImg(file);
        }

        let response = await UserServices.UpdateUser(data);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
            return;
        }

        if (typeof userState === "undefined") {
            navigate("/")
            return;
        }

        navigate(`/Users/${userState.username}`);

        enqueueSnackbar("Profile has been successfully updated", {
                variant: "success"
            }
        );
    }

    const showPreview = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setFile(imageFile);
                setImagePath(x.target?.result);
            }
            reader.readAsDataURL(imageFile)
        } else {
            setFile(undefined);
            setImagePath(path + userState?.avatarLink);
        }
    }

    const fetchData = useCallback(async () => {
        if (typeof auth.user === "undefined") return;
        if (typeof auth.user.username === "undefined") return;

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

    useEffect(() => {
        if(typeof userState?.avatarLink != "undefined")
        {
            setImagePath(path + userState?.avatarLink);
        }
    }, [userState])

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
                <PageTitle name="Personal information"/>
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
                        <Typography variant="h6">
                            Avatar:
                        </Typography>
                        <Box
                            sx={{
                                m: "20px 0",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    mb: 2,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    alt=""
                                    src={imagePath}
                                />
                            </Box>
                            <input
                                type="file"
                                accept="image/*"
                                id="image-uploader"
                                name="file"
                                onChange={showPreview}
                            />
                        </Box>

                        <Typography variant="h6">
                            UserName:
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="userName"
                            value={userState.username}
                            disabled={true}
                        />
                        <Typography variant="h6">
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
                        <Typography variant="h6">
                            Lastname:
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="lastname"
                            value={userState.lastName}
                            disabled={true}
                        />
                        <Typography variant="h6">
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
                        <Typography variant="h6">
                            Description:
                        </Typography>
                        <Box
                            sx={{
                                m: "20px 0"
                            }}
                        >
                            <TextEditor
                                setValue={setValue}
                                name="description"
                                initialValue={userState.description}
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
                            Update profile
                        </Button>
                    </Card>
                </Container>
            )}
        </Box>
    );
}