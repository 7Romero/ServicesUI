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
import {useCallback, useEffect, useRef, useState} from "react";
import SectionServices from "../../services/SectionServices";
import SectionDto from "../../entities/Section/SectionDto";
import OrderCreateDto from "../../entities/Order/OrderCreateDto";
import OrderServices from "../../services/OrderServices";
import {useNavigate} from "react-router-dom";
import {Editor} from "@tinymce/tinymce-react";
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

export default function CreateOrder() {
    const [sections, setSections] = useState<SectionDto[]>([]);
    const [selectSection, setSelectSection] = useState<number>(0);
    const [isSelectedSection, setIsSelectedSection] = useState<boolean>(true);
    const [selectCategory, setSelectCategory] = useState<string>("");

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

        if(typeof data.description === "undefined" || data.description === "") {
            enqueueSnackbar("Description is required", {
                    variant: "error"
                }
            );
            return;
        }

        let response = await OrderServices.CreateOrder(data);

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
            return;
        }

        navigate(`/Orders/${response.Data.id}`);

        enqueueSnackbar("Order has been successfully created", {
                variant: "success"
            }
        );
    }

    const fetchData = useCallback(async () => {
        const response = await SectionServices.GetAll();

        if (response.Status) {
            setSections(response.Data);
        } else {
            enqueueSnackbar(response.Message, {
                    variant: response.Variant
                }
            );
        }

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
                <PageTitle name="Create order" />
            </Box>

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
                        Order name
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="orderName"
                        autoComplete="orderName"
                        error={Boolean(errors.title?.message)}
                        helperText={errors.title?.message}
                        {...register("title", {
                            minLength: {
                                value: 5,
                                message: "Order name must contain at lest 5 characters",
                            },
                            maxLength: {
                                value: 50,
                                message: "Order name must contain at most 50 characters",
                            },
                            required: "Order name is required",
                        })
                        }
                    />
                    <Typography variant="h5">
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
                            initialValue={""}
                        />
                    </Box>

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
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                            }}
                        >
                            <Box
                                sx={{mr: 5}}
                            >
                                <Typography variant="h5">
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
                                <Typography variant="h5">
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
                                        required: "Please select category",
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
                        Create order
                    </Button>
                </Card>
            </Container>
        </Box>
    );
}