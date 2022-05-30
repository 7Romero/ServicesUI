import axios from "../axios";
import StripeRequestDto from "../../../entities/Stripe/StripeRequestDto";

const endpoints = {
    getClientKey: (data: StripeRequestDto) => axios.post(`stripe`, data),
};

export default endpoints;