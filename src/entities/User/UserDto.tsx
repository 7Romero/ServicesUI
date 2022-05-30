type UserDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string,
    registrationDate: string,
    description: string | undefined,
    descriptionTitle: string | undefined,
    avatarLink: string | undefined,
}

export default UserDto;