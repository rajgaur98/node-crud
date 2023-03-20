import { type UserType } from '../models/types'
import { type UserRepoType } from '../repos/types'
import { v4 as uuidv4 } from 'uuid'

export class UserService {
  userRepo: UserRepoType

  constructor(userRepo: UserRepoType) {
    this.userRepo = userRepo
  }

  async getUsers(options: { id?: string }): Promise<{
    data?: UserType[]
    err: any
  }> {
    let responseObj: {
      data?: UserType[]
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    const query: {
      id?: string
    } = {}
    if (options.id !== null && options.id !== undefined && options.id !== '') {
      query.id = options.id
    }
    try {
      const repoResp = await this.userRepo.get(query)
      responseObj = repoResp
    } catch (err) {
      console.error('UserService.getUsers', err)
      responseObj.err = err
    }
    return responseObj
  }

  async createUser(user: Partial<UserType>): Promise<{
    data?: UserType
    err: any
  }> {
    let responseObj: {
      data?: UserType
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    if (user.id === null || user.id === undefined || user.id === '') {
      user.id = uuidv4()
    }
    try {
      const repoResp = await this.userRepo.create(user as UserType)
      responseObj = repoResp
    } catch (err) {
      console.error('UserService.createUser', err)
      responseObj.err = err
    }
    return responseObj
  }

  async updateUser(
    user: Partial<UserType>,
    options: { id: string }
  ): Promise<{
    data?: { msg: string }
    err: any
  }> {
    let responseObj: {
      data?: { msg: string }
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    try {
      const repoResp = await this.userRepo.update(user, options)
      responseObj = repoResp
    } catch (err) {
      console.error('UserService.createUser', err)
      responseObj.err = err
    }
    return responseObj
  }

  async deleteUser(options: { id: string }): Promise<{
    data?: { msg: string }
    err: any
  }> {
    let responseObj: {
      data?: { msg: string }
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    try {
      const repoResp = await this.userRepo.delete(options)
      responseObj = repoResp
    } catch (err) {
      console.error('UserService.deleteUser', err)
      responseObj.err = err
    }
    return responseObj
  }
}
