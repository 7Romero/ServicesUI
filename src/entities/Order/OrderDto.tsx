import UserDto from "../User/UserDto";

type OrderDto = {
    id: string;
    title: string;
    description: string,
    suggestedPrice: number,
    categoryId: string,
    categoryName: string,
    created: string,
    user: UserDto,
    freelancer: UserDto,
}

export default OrderDto;