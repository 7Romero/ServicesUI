import {useCallback, useEffect, useState} from "react";
import CheckoutForm from "../../components/Payment/CheckoutForm";
import {Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeServices from "../../services/StripeServices";
import "./style.scss"
import {Box, Card} from "@mui/material";
import {useForm} from "react-hook-form";
import OrderCreateDto from "../../entities/Order/OrderCreateDto";
import Typography from "@mui/material/Typography";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const stripePromise = loadStripe("pk_test_51L43XLCQoi7gKZGBXikOS0gIzK4hFZdb6pT5XbIVCWIy0x7AhtrSUC3mNFAVQZQVQpzSs7SrcaSsLlYGayOI60eF00sZoPLXlC");

export default function Payment() {

    const [clientSecret, setClientSecret] = useState("");

    const [money, setMoney] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const appearance: Appearance = {
        theme: "stripe",
    };
    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
    };

    const handlerSubmit = async () => {
        if(/\D/.test(money) && money.length != 0)
        {
            setErrorMessage("Enter only numbers");
            return;
        }

        let amount: number = +money;
        amount *= 100;

        const response = await StripeServices.getClientKey({id: "string", amount: amount});

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });

            return;
        }

        setClientSecret(response.Data.clientSecret)
    }

    return(
        <>
            {clientSecret ? (
                <Box
                    className={"payment"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        height: "100%",
                    }}
                >
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </Box>
            ) : (
                <Box
                    className={"payment"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        height: "100%",
                    }}
                >
                    <Card
                        sx={{
                            mt: 5,
                            p: "20px",
                        }}
                    >
                        <Typography variant="h5">
                            Balance replenishment
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="orderName"
                            value={money}
                            onChange={(e) => {setMoney(e.target.value)}}
                        />
                        {errorMessage && (<Typography color={"red"}>{errorMessage}</Typography>)}
                        <Button
                            onClick={handlerSubmit}
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
                            Next
                        </Button>
                    </Card>
                </Box>
            )}
        </>
    );
}

function enqueueSnackbar(Message: string, arg1: { variant: "default" | "error" | "success" | "warning" | "info"; }) {
    throw new Error("Function not implemented.");
}
