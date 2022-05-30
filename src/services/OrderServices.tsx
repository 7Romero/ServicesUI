import api from "../shared/api";
import ResponseDto from "../entities/Response/ResponseDto";
import {PaginateType} from "../shared/contexts/PaginateContext";
import OrderDto from "../entities/Order/OrderDto";
import OrderCreateDto from "../entities/Order/OrderCreateDto";
import AppointFreelancerDto from "../entities/Order/AppointFreelancerDto";


const SectionServices = {
    GetPagedOrders: async (paginate: PaginateType) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.GetPagedOrders(paginate)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
    GetOrder: async (id: string) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.GetOrder(id)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
    CreateOrder: async (order: OrderCreateDto) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.CreateOrder(order)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
    DeleteOrder: async (id: string) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.DeleteOrder(id)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
    DeleteOrderAdmin: async (id: string) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.DeleteOrderAdmin(id)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
    UpdateOrder: async (id: string, order: OrderCreateDto) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.UpdateOrder(id, order)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
    UpdateOrderAdmin: async (id: string, order: OrderCreateDto) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.UpdateOrderAdmin(id, order)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
    AppointFreelancer: async (data: AppointFreelancerDto) => {
        const responseFormat: ResponseDto = {
            Status: false,
            Variant: "default",
            Message: "",
            Data: null,
        }

        await api.order.AppointFreelancer(data)
            .then(function (response) {
                responseFormat.Status = true;
                responseFormat.Data = response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    responseFormat.Status = false;
                    responseFormat.Variant = "error"
                    responseFormat.Message = error.response.data.errorText;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return responseFormat;
    },
}

export  default SectionServices;