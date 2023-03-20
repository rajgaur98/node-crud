import { describe, expect, test, jest } from '@jest/globals'
import { type UserType } from '../models/types'
import { type UserRepo } from '../repos/UserRepo'
import { UserService } from './UserServices'

describe('UserService', () => {
  test('.getUsers', async () => {
    const userRepoMock = {
      get: jest.fn(() => ({ data: [{}] }))
    }
    const userService = new UserService(userRepoMock as unknown as UserRepo)
    const resp = await userService.getUsers({})
    expect(userRepoMock.get).toBeCalledTimes(1)
    expect(resp.data).toHaveLength(1)
    expect(resp.err).toBeFalsy()
  })

  test('.create', async () => {
    const user = {
      name: 'user',
      email: 'user@example.com',
      age: 20,
      phone: '123-456-7890'
    }
    const userRepoMock = {
      create: jest.fn(() => ({ data: user }))
    }
    const userService = new UserService(userRepoMock as unknown as UserRepo)
    const resp = await userService.createUser(user as UserType)
    expect(userRepoMock.create).toBeCalledTimes(1)
    expect(resp.data).toEqual(user)
    expect(resp.err).toBeFalsy()
  })

  test('.update', async () => {
    const user = {
      name: 'user',
      email: 'user@example.com',
      age: 20,
      phone: '123-456-7890'
    }
    const userRepoMock = {
      update: jest.fn(() => ({ data: { msg: 'success' } }))
    }
    const userService = new UserService(userRepoMock as unknown as UserRepo)
    const resp = await userService.updateUser(user as UserType, { id: '1' })
    expect(userRepoMock.update).toBeCalledTimes(1)
    expect(resp.data).toEqual({ msg: 'success' })
    expect(resp.err).toBeFalsy()
  })

  test('.delete', async () => {
    const userRepoMock = {
      delete: jest.fn(() => ({ data: { msg: 'success' } }))
    }
    const userService = new UserService(userRepoMock as unknown as UserRepo)
    const resp = await userService.deleteUser({ id: '1' })
    expect(userRepoMock.delete).toBeCalledTimes(1)
    expect(resp.data).toEqual({ msg: 'success' })
    expect(resp.err).toBeFalsy()
  })
})
