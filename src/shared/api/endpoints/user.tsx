import axios from "../axios";
import UserUpdateDto from "../../../entities/User/UserUpdateDto";

const endpoints = {
    getUser: (data: string) => axios.get(`user/${data}`),
    updateUser: (data: UserUpdateDto) => axios.put("/user", data),
    updateUserImg: (file: any) => axios.put("/user/img", {file: file}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
};

export default endpoints;