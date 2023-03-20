import { type UserType, type UserModelType } from '../models/types'

export class UserRepo {
  userModel: UserModelType

  constructor(userModel: UserModelType) {
    this.userModel = userModel
  }

  async get(options: { id?: string }): Promise<{
    data?: UserType[]
    err: any
  }> {
    const responseObj: {
      data?: UserType[]
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    try {
      const modelResp = await this.userModel.findAll({
        where: options
      })
      responseObj.data = modelResp.map((e) => e.toJSON())
    } catch (err) {
      console.error('UserRepo.get', err)
      responseObj.err = err
    }
    return responseObj
  }

  async create(user: UserType): Promise<{
    data?: UserType
    err: any
  }> {
    const responseObj: {
      data?: UserType
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    try {
      const modelResp = await this.userModel.create(user)
      responseObj.data = modelResp
    } catch (err) {
      console.error('UserRepo.create', err)
      responseObj.err = err
    }
    return responseObj
  }

  async update(
    user: Partial<UserType>,
    query: { id: string }
  ): Promise<{
    data?: { msg: string }
    err: any
  }> {
    const responseObj: {
      data?: { msg: string }
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    try {
      await this.userModel.update(user, {
        where: query
      })
      responseObj.data = { msg: 'success' }
    } catch (err) {
      console.error('UserRepo.update', err)
      responseObj.err = err
    }
    return responseObj
  }

  async delete(query: { id: string }): Promise<{
    data?: { msg: string }
    err: any
  }> {
    const responseObj: {
      data?: { msg: string }
      err: any
    } = {
      data: undefined,
      err: undefined
    }
    try {
      await this.userModel.destroy({ where: query })
      responseObj.data = { msg: 'success' }
    } catch (err) {
      console.error('UserRepo.delete', err)
      responseObj.err = err
    }
    return responseObj
  }
}
