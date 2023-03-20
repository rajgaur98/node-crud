import { UserService } from '../services/UserServices'
import { Repos } from './Repos'

export const Services = {
  UserService: new UserService(Repos.UserRepo)
}
