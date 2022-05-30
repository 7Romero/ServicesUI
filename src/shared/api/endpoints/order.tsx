import axios from "../axios";
import {PaginateType} from "../../contexts/PaginateContext";
import OrderCreateDto from "../../../entities/Order/OrderCreateDto";
import AppointFreelancerDto from "../../../entities/Order/AppointFreelancerDto";

const endpoints = {
    GetPagedOrders: (data: PaginateType) => axios.post("/order/paginated-search", data),
    GetOrder: (data: string) => axios.get(`/order/${data}`),
    CreateOrder: (data: OrderCreateDto) => axios.post("/order", data),
    DeleteOrder: (data: string) => axios.delete(`/order/${data}`),
    DeleteOrderAdmin: (data: string) => axios.delete(`/order/${data}`),
    UpdateOrder: (id: string, data: OrderCreateDto) => axios.put(`/order/${id}`, data),
    UpdateOrderAdmin: (id: string, data: OrderCreateDto) => axios.put(`/order/Admin/${id}`, data),
    AppointFreelancer: (data: AppointFreelancerDto) => axios.post(`/order/appointFreelancer`, data)
};

export default endpoints;