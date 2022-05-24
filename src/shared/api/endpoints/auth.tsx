import axios from "../axios";
import UserLoginDto from "../../../entities/User/UserLoginDto";
import UserRegistrationDto from "../../../entities/User/UserRegistrationDto";

const endpoints = {
    registration: (data: UserRegistrationDto) => axios.post("/account/register", data),
    login: (data: UserLoginDto) => axios.post("/account/login", data),
    // forgotPassword: (data: any) => axios.post("", data),
    getProfile: () => axios.get("/account/getMe"),
    // updateProfile: (data: any) => axios.patch("", data),
};

export default endpoints;