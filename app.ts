import './lib/initenv'
import express, { type Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { userRouter } from './routes/users'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swagger.json'

const app: Application = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use('/users', userRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
