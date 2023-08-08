import { User } from "../../entities/user.entity"


export const USER_REPOSITORY = 'USER_REPOSITORY'

export interface UserRepositoryInterface {
  create(user: User): Promise<User>
  getByEmail(email: string): Promise<User>
}
