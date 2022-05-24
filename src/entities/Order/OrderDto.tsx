import UserDto from "../User/UserDto";

type OrderDto = {
    id: string;
    title: string;
    description: string,
    suggestedPrice: number,
    categoryName: string,
    created: string,
    user: UserDto,
}

export default OrderDto;