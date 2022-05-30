import {useCallback, useEffect, useState} from "react";
import CheckoutForm from "../../components/Payment/CheckoutForm";
import {Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import UserServices from "../../services/UserServices";
import StripeServices from "../../services/StripeServices";

const stripePromise = loadStripe("pk_test_51L43XLCQoi7gKZGBXikOS0gIzK4hFZdb6pT5XbIVCWIy0x7AhtrSUC3mNFAVQZQVQpzSs7SrcaSsLlYGayOI60eF00sZoPLXlC");

export default function Payment() {

    const [clientSecret, setClientSecret] = useState("");

    const appearance: Appearance = {
        theme: "stripe",
    };
    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
    };

    const fetchData = useCallback(async () => {
        const response = await StripeServices.getClientKey({id: "string"});

        if (!response.Status) {
            enqueueSnackbar(response.Message, {
                variant: response.Variant
            });

            return;
        }

        setClientSecret(response.Data.clientSecret)

    }, []);

    useEffect(() => {
        fetchData()

    }, [fetchData])

    // useEffect(() => {
    //
    //     Create PaymentIntent as soon as the page loads
    //     fetch("http://localhost:7200/api/stripe", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setClientSecret(data.clientSecret));
    // }, []);

    return(
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}

function enqueueSnackbar(Message: string, arg1: { variant: "default" | "error" | "success" | "warning" | "info"; }) {
    throw new Error("Function not implemented.");
}
