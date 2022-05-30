import axios from "../axios";
import ApplicationDto from "../../../entities/Application/ApplicationDto";
import AppointFreelancerDto from "../../../entities/Order/AppointFreelancerDto";

const endpoints = {
    CreateApplication: (data: ApplicationDto) => axios.post("/application", data),
    UpdateApplication: (id: string, data: ApplicationDto) => axios.put(`/application/${id}`, data),
    GetApplicationForOrder: (data: string) => axios.get(`/application/order/${data}`),
    GetApplicationsForOrder: (data: string) => axios.get(`/application/allForOrder/${data}`),
};

export default endpoints;