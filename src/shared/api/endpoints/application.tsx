import axios from "../axios";
import ApplicationDto from "../../../entities/Application/ApplicationDto";

const endpoints = {
    CreateApplication: (data: ApplicationDto) => axios.post("/application", data),
    GetApplicationForOrder: (data: string) => axios.get(`/application/order/${data}`),
};

export default endpoints;