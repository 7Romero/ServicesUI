import axios from "../axios";
import UserUpdateDto from "../../../entities/User/UserUpdateDto";

const endpoints = {
    getUser: (data: string) => axios.get(`user/${data}`),
    updateUser: (data: UserUpdateDto) => axios.put("/user", data)
};

export default endpoints;