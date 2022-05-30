import * as React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import PageTitle from "../../components/PageTitle";
import {Card, InputAdornment, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import OrderDto from "../../entities/Order/OrderDto";
import {useCallback, useEffect, useState} from "react";
import SectionServices from "../../services/SectionServices";
import SectionDto from "../../entities/Section/SectionDto";
import OrderCreateDto from "../../entities/Order/OrderCreateDto";
import UserServices from "../../services/UserServices";
import OrderServices from "../../services/OrderServices";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../shared/hooks/useAuth";
import TextEditor from "../../components/TextEditor";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
export default function EditOrder() {
    const [sections, setSections] = useState<SectionDto[]>([]);
    const [orderState, setOrderState] = useState<OrderDto>();
    const [selectSection, setSelectSection] = useState<number>(0);
    const [isSelectedSection, setIsSelectedSection] = useState<boolean>(true);
    const [selectCategory, setSelectCategory] = useState<string>("");

    const {id} = useParams();
    const auth = useAuth();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch, formState: {errors}
    } = useForm<OrderCreateDto>();

    const onSubmit: SubmitHandler<OrderCreateDto> = async data => {
        if (typeof id === "undefined") return;
        let response;

        if(auth.user?.roles?.find((role) => role === "Administrator")) {
            response = await OrderServices.UpdateOrderAdmin(id, data);
        }
        else{
            response = await OrderServices.UpdateOrder(id ,data);
        }

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });

            return;
        }

        navigate(`/Orders/${id}`);
        enqueueSnackbar("Order successfully updated", {
            variant: "success"
        });
    }

    const fetchSection = async () => {
        const response = await SectionServices.GetAll();

        if (response.Status) {
            setSections(response.Data);
        } else {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
        }
    }

    const fetchOrder = async () => {
        if (typeof id === "undefined") return;

        const response = await OrderServices.GetOrder(id);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });

            return;
        }

        if (!response.Data) {
            navigate("/not-found-404");
            return;
        }

        setOrderState(response.Data);
    }

    const fetchData = useCallback(async () => {
        await fetchSection();
        await fetchOrder();
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
                <PageTitle name="Edit order" />
            </Box>

            {orderState &&
                (auth.user?.roles?.find((role) => role === "Administrator") ||
                auth.user?.username === orderState?.user.username) && (
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
                            Order name
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="orderName"
                            autoComplete="orderName"
                            defaultValue={orderState.title}
                            error={Boolean(errors.title?.message)}
                            helperText={errors.title?.message}
                            {...register("title", {
                                minLength: {
                                    value: 5,
                                    message: "Order name must contain at lest 5 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Order name must contain at most 20 characters",
                                },
                                required: "Order name is required",
                            })
                            }
                        />
                        <Typography variant="h6">
                            Description
                        </Typography>
                        <Box
                            sx={{
                                m: "20px 0"
                            }}
                        >
                            <TextEditor
                                setValue={setValue}
                                name="description"
                                initialValue={orderState.description}
                            />
                        </Box>
                        <Typography variant="h6">
                            Budget
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            id="budget"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">USD</InputAdornment>
                            }}
                            defaultValue={orderState.suggestedPrice}
                            error={Boolean(errors.suggestedPrice?.message)}
                            helperText={errors.suggestedPrice?.message}
                            {...register("suggestedPrice", {
                                pattern: {
                                    value: /^\d/i,
                                    message: "Please enter a number"
                                },
                                required: "Budget name is required",
                            })
                            }
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                            }}
                        >
                            <Box
                                sx={{mr: 5}}
                            >
                                <Typography variant="h6">
                                    Section
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    select
                                    SelectProps= {{
                                        MenuProps: MenuProps,
                                    }}
                                    id="section"
                                    helperText="Please select section"
                                    defaultValue= {sections ? "" : "0"}
                                    onChange={(e)=>{
                                        setSelectSection(Number(e.target.value));
                                        setIsSelectedSection(false);
                                        setSelectCategory("");
                                    }}
                                >
                                    {sections.map((section, index) => (
                                        <MenuItem key={section.name} value={index}>
                                            {section.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Category
                                </Typography>
                                <TextField
                                    disabled = {isSelectedSection}
                                    margin="normal"
                                    required
                                    select = {!isSelectedSection}
                                    SelectProps= {{
                                        MenuProps: MenuProps,
                                    }}
                                    id= "category"
                                    helperText= "Please select category"
                                    value = {selectCategory}
                                    error={Boolean(errors.categoryId?.message)}
                                    {...register("categoryId", {
                                        onChange: (e) => {
                                            setSelectCategory(e.target.value);
                                        },
                                        required: "Order name is required",
                                    })
                                    }
                                >
                                    {sections[selectSection] && sections[selectSection].category.map((category) => (
                                        <MenuItem key={category.name} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                            Update order
                        </Button>
                    </Card>
                </Container>
            )}
        </Box>
    );
}