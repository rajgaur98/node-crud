import { describe, expect, test, jest } from '@jest/globals'
import { type UserType, type UserModelType } from '../models/types'
import { UserRepo } from './UserRepo'

describe('UserRepo', () => {
  test('.get', async () => {
    const userModelMock = {
      findAll: jest.fn(() => {
        return [
          {
            toJSON: () => ({})
          }
        ]
      })
    }
    const userRepo = new UserRepo(userModelMock as unknown as UserModelType)
    const resp = await userRepo.get({})
    expect(userModelMock.findAll).toBeCalledTimes(1)
    expect(resp.data).toHaveLength(1)
    expect(resp.err).toBeFalsy()
  })

  test('.create', async () => {
    const user = {
      id: '1',
      name: 'user',
      email: 'user@example.com',
      age: 20,
      phone: '123-456-7890'
    }
    const userModelMock = {
      create: jest.fn(() => user)
    }
    const userRepo = new UserRepo(userModelMock as unknown as UserModelType)
    const resp = await userRepo.create(user as UserType)
    expect(userModelMock.create).toBeCalledTimes(1)
    expect(resp.data).toEqual(user)
    expect(resp.err).toBeFalsy()
  })

  test('.update', async () => {
    const user = {
      id: '1',
      name: 'user',
      email: 'user@example.com',
      age: 20,
      phone: '123-456-7890'
    }
    const userModelMock = {
      update: jest.fn()
    }
    const userRepo = new UserRepo(userModelMock as unknown as UserModelType)
    const resp = await userRepo.update(user as UserType, { id: '1' })
    expect(userModelMock.update).toBeCalledTimes(1)
    expect(resp.data).toEqual({ msg: 'success' })
    expect(resp.err).toBeFalsy()
  })

  test('.delete', async () => {
    const userModelMock = {
      destroy: jest.fn()
    }
    const userRepo = new UserRepo(userModelMock as unknown as UserModelType)
    const resp = await userRepo.delete({ id: '1' })
    expect(userModelMock.destroy).toBeCalledTimes(1)
    expect(resp.data).toEqual({ msg: 'success' })
    expect(resp.err).toBeFalsy()
  })
})
