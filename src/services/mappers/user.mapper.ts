import { User } from "../../entities/user.entity"

export const userToUserResponse = (user: User) => {
    delete user.password
    return user
}