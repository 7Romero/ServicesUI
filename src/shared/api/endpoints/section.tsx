import axios from "../axios";

const endpoints = {
    getAll: () => axios.get("/section"),
};

export default endpoints;