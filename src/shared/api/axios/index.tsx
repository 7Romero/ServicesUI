import axios, {AxiosRequestConfig} from "axios";
import Cookies from "js-cookie";

// https://nestjs-boilerplate-test.herokuapp.com/docs/

const axiosInstance = axios.create({
    baseURL: "https://localhost:7200/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get("auth-token");

        if (authToken && typeof config.headers != "undefined") {
            config.headers.authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;