import { UserRepo } from '../repos/UserRepo'
import { Models } from './Models'

export const Repos = {
  UserRepo: new UserRepo(Models.User)
}
