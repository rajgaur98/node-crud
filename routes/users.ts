import { celebrate, Joi } from 'celebrate'
import { type Request, Router } from 'express'
import { Services } from '../loader/Services'
import { type UserType } from '../models/types'

const router = Router()

router.get(
  '/:id',
  celebrate(
    {
      params: {
        id: Joi.string().required()
      }
    },
    {
      allowUnknown: true
    }
  ),
  (req: Request<{ id?: string }>, res) => {
    try {
      const { id } = req.params
      Services.UserService.getUsers({ id })
        .then((serviceResp: { data?: UserType[]; err: any }) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (serviceResp.err) {
            return res.status(500).send({ msg: 'Internal Server Error' })
          }
          return res.status(200).send(serviceResp.data)
        })
        .catch((err) => {
          console.error('GET - /users/:id', err)
          return res.status(500).send({ msg: 'Internal Server Error' })
        })
    } catch (err) {
      console.error('GET - /users/:id', err)
      return res.status(500).send({ msg: 'Internal Server Error' })
    }
  }
)

router.get('/', (_req, res) => {
  try {
    Services.UserService.getUsers({})
      .then((serviceResp: { data?: UserType[]; err: any }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (serviceResp.err) {
          return res.status(500).send({ msg: 'Internal Server Error' })
        }
        return res.status(200).send(serviceResp.data)
      })
      .catch((err) => {
        console.error('GET - /users', err)
        return res.status(500).send({ msg: 'Internal Server Error' })
      })
  } catch (err) {
    console.error('GET - /users', err)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
})

router.post(
  '/',
  celebrate(
    {
      body: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        age: Joi.number().required(),
        phone: Joi.string().optional()
      }
    },
    {
      allowUnknown: true
    }
  ),
  (req, res) => {
    try {
      const { name, email, age, phone } = req.body
      Services.UserService.createUser({ name, email, age, phone })
        .then((serviceResp: { data?: UserType; err: any }) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (serviceResp.err) {
            return res.status(500).send({ msg: 'Internal Server Error' })
          }
          return res.status(200).send(serviceResp.data)
        })
        .catch((err) => {
          console.error('POST - /users', err)
          return res.status(500).send({ msg: 'Internal Server Error' })
        })
    } catch (err) {
      console.error('POST - /users', err)
      return res.status(500).send({ msg: 'Internal Server Error' })
    }
  }
)

router.put(
  '/:id',
  celebrate(
    {
      body: {
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        age: Joi.number().optional(),
        phone: Joi.string().optional()
      }
    },
    {
      allowUnknown: true
    }
  ),
  (req: Request<{ id?: string }>, res) => {
    try {
      const { id } = req.params
      const { name, email, age, phone } = req.body
      Services.UserService.updateUser(
        { name, email, age, phone },
        { id: id as string }
      )
        .then((serviceResp: { data?: { msg: string }; err: any }) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (serviceResp.err) {
            return res.status(500).send({ msg: 'Internal Server Error' })
          }
          return res.status(200).send(serviceResp.data)
        })
        .catch((err) => {
          console.error('PUT - /users', err)
          return res.status(500).send({ msg: 'Internal Server Error' })
        })
    } catch (err) {
      console.error('PUT - /users', err)
      return res.status(500).send({ msg: 'Internal Server Error' })
    }
  }
)

router.delete('/:id', (req: Request<{ id?: string }>, res) => {
  try {
    const { id } = req.params
    Services.UserService.deleteUser({ id: id as string })
      .then((serviceResp: { data?: { msg: string }; err: any }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (serviceResp.err) {
          return res.status(500).send({ msg: 'Internal Server Error' })
        }
        return res.status(200).send(serviceResp.data)
      })
      .catch((err) => {
        console.error('DELETE - /users', err)
        return res.status(500).send({ msg: 'Internal Server Error' })
      })
  } catch (err) {
    console.error('DELETE - /users', err)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
})

export { router as userRouter }
