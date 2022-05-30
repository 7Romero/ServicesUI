import UserDto from "../User/UserDto";

type ApplicationDto = {
    id: string,
    description: string,
    suggestedPrice: number,
    suggestedTime: number,
    user: UserDto,
    orderId: string,
}

export default ApplicationDto;